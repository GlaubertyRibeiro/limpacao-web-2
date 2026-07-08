import { useState, useEffect } from 'react';

export function useReports(currentUser = null) {
  const API = import.meta.env.VITE_API_URL || 'http://localhost:3001';
  const [reports, setReports] = useState([]);
  const currentUserId = currentUser?.id ?? currentUser?.userId ?? null;
  const currentUserName = currentUser?.name ?? currentUser?.nome ?? null;
  const [filterUrgency, setFilterUrgency] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const normalize = (r) => {
    const ownerId = r.usuario_id ?? r.userId ?? r.ownerId ?? null;
    const isOwner = currentUserId != null && ownerId != null && Number(currentUserId) === Number(ownerId);

    // API retorna participantes/ajudantes como strings, precisamos converter para números
    const participantes = parseInt(r.participantes ?? r.participants ?? 0);
    const ajudantes = parseInt(r.ajudantes ?? r.helpers ?? 0);
    const participando = Boolean(r.participando ?? r.myParticipation?.participating ?? false);
    const ajudando = Boolean(r.ajudando ?? r.myParticipation?.helping ?? false);

    return {
      id: r.id,
      title: r.titulo || r.title || '',
      location: r.localizacao || r.location || '',
      urgency: r.urgencia || r.urgency || 'medium',
      status: r.status || 'pending',
      date: r.data || r.date || '',
      image: r.imagem || r.image || '',
      description: r.descricao || r.description || '',
      author: r.autor || r.author || 'Você',
      participants: participantes,
      helpers: ajudantes,
      helpOffers: Array.isArray(r.helpOffers) ? r.helpOffers : [],
      chat: Array.isArray(r.chat) ? r.chat : [],
      myParticipation: {
        participating: participando,
        helping: ajudando,
      },
      multirao: !!r.multirao,
      ownerId,
      isOwner,
    };
  };

  const normalizeMessage = (message) => ({
    id: message.id,
    author: message.autor || message.author || 'Usuário',
    text: message.texto || message.text || '',
    date: message.criado_em || message.date || '',
    authorName: message.autor || message.author || 'Usuário',
    isMine:
      currentUserName != null &&
      ((message.autor && message.autor === currentUserName) ||
        (message.author && message.author === currentUserName)),
  });

  const normalizeOffer = (offer) => ({
    id: offer.id,
    name: offer.nome || offer.name || '',
    phone: offer.telefone || offer.phone || '',
    message: offer.mensagem || offer.message || '',
    date: offer.criado_em || offer.date || '',
  });

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const query = currentUserId ? `?usuario_id=${encodeURIComponent(currentUserId)}` : '';
        const resp = await fetch(`${API}/api/relatorios${query}`);
        if (!resp.ok) throw new Error('Falha ao buscar relatórios');
        const data = await resp.json();
        if (!mounted) return;
        setReports(Array.isArray(data) ? data.map(normalize) : []);
      } catch (e) {
        if (!mounted) return;
        setReports([]);
      }
    })();
    return () => (mounted = false);
  }, [API, currentUserId]);

  const loadReportDetails = async (id) => {
    try {
      const [chatResp, offersResp] = await Promise.all([
        fetch(`${API}/api/relatorios/${id}/chat`),
        fetch(`${API}/api/relatorios/${id}/ofertas-ajuda`),
      ]);

      const chat = chatResp.ok ? await chatResp.json() : [];
      const helpOffers = offersResp.ok ? await offersResp.json() : [];
      setReports((cur) =>
        cur.map((r) =>
          r.id === id
            ? {
                ...r,
                chat: Array.isArray(chat) ? chat.map(normalizeMessage) : [],
                helpOffers: Array.isArray(helpOffers) ? helpOffers.map(normalizeOffer) : [],
              }
            : r
        )
      );
    } catch (e) {
      console.error('Erro ao carregar detalhes do relatório', e);
    }
  };

  const filteredReports = reports.filter((report) => {
    const matchesUrgency = filterUrgency === 'all' || report.urgency === filterUrgency;
    const matchesStatus = filterStatus === 'all' || report.status === filterStatus;
    const matchesSearch =
      report.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.location.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesUrgency && matchesStatus && matchesSearch;
  });

  const stats = {
    total: reports.length,
    resolved: reports.filter((r) => r.status === 'resolved').length,
    inProgress: reports.filter((r) => r.status === 'in-progress').length,
  };

  const addReport = async (newReportData) => {
    const payload = {
      titulo: newReportData.title,
      localizacao: newReportData.location,
      descricao: newReportData.description,
      urgencia: newReportData.urgency,
      imagem: newReportData.image || '',
      multirao: newReportData.multirao ?? false,
      autor: newReportData.author || 'Você',
      usuario_id: currentUserId ?? newReportData.userId ?? null,
    };
    try {
      const resp = await fetch(`${API}/api/relatorios`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const text = await resp.text();
      let created;
      try { created = text ? JSON.parse(text) : null; } catch { created = null; }
      if (!resp.ok || !created) {
        throw new Error(text || 'Falha ao criar relatório');
      }
      setReports((cur) => [normalize(created), ...cur]);
      return created;
    } catch (e) {
      const fallback = {
        id: Date.now(),
        ...newReportData,
        status: 'pending',
        date: new Date().toISOString().split('T')[0],
        ownerId: currentUserId ?? newReportData.userId ?? null,
        isOwner: true,
      };
      setReports((cur) => [fallback, ...cur]);
      return fallback;
    }
  };

  const updateReport = async (id, updatedData, options = {}) => {
    try {
      const currentReport = options.currentReport ?? reports.find((r) => r.id === id);
      const isParticipationOnlyUpdate =
        (updatedData.participants != null || updatedData.participantes != null || updatedData.helpers != null || updatedData.ajudantes != null) &&
        !['title', 'titulo', 'location', 'localizacao', 'description', 'descricao', 'urgency', 'urgencia', 'image', 'imagem', 'multirao', 'status', 'previousStatus', 'status_anterior', 'userId', 'usuario_id'].some((field) => field in updatedData);

      const payload = {
        titulo: updatedData.title ?? updatedData.titulo ?? currentReport?.title ?? currentReport?.titulo ?? '',
        localizacao: updatedData.location ?? updatedData.localizacao ?? currentReport?.location ?? currentReport?.localizacao ?? '',
        descricao: updatedData.description ?? updatedData.descricao ?? currentReport?.description ?? currentReport?.descricao ?? '',
        urgencia: updatedData.urgency ?? updatedData.urgencia ?? currentReport?.urgency ?? currentReport?.urgencia ?? 'medium',
        imagem: updatedData.image ?? updatedData.imagem ?? currentReport?.image ?? currentReport?.imagem ?? '',
        multirao: updatedData.multirao ?? currentReport?.multirao ?? false,
        participantes: updatedData.participants ?? updatedData.participantes ?? currentReport?.participants ?? currentReport?.participantes ?? 0,
        ajudantes: updatedData.helpers ?? updatedData.ajudantes ?? currentReport?.helpers ?? currentReport?.ajudantes ?? 0,
        status: updatedData.status ?? currentReport?.status ?? 'pending',
        status_anterior: updatedData.previousStatus ?? currentReport?.previousStatus ?? null,
      };

      if (!isParticipationOnlyUpdate) {
        payload.usuario_id = currentUserId ?? updatedData.userId ?? currentReport?.ownerId ?? null;
      }
      const resp = await fetch(`${API}/api/relatorios/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const updated = await resp.json();
      const preservedParticipation = updatedData.myParticipation ?? currentReport?.myParticipation ?? { participating: false, helping: false };
      const preservedParticipants = updatedData.participants ?? updatedData.participantes ?? currentReport?.participants ?? currentReport?.participantes ?? 0;
      const preservedHelpers = updatedData.helpers ?? updatedData.ajudantes ?? currentReport?.helpers ?? currentReport?.ajudantes ?? 0;
      setReports((cur) =>
        cur.map((r) =>
          r.id === id
            ? normalize({
                ...updated,
                participantes: preservedParticipants,
                ajudantes: preservedHelpers,
                myParticipation: preservedParticipation,
              })
            : r
        )
      );
    } catch (e) {
      setReports((cur) => cur.map((r) => (r.id === id ? { ...r, ...updatedData } : r)));
    }
  };

  const deleteReport = async (id) => {
    try {
      await fetch(`${API}/api/relatorios/${id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ usuario_id: currentUserId ?? null }),
      });
      setReports((cur) => cur.filter((r) => r.id !== id));
    } catch (e) {
      setReports((cur) => cur.filter((r) => r.id !== id));
    }
  };

  const toggleParticipation = async (id, type) => {
    setReports((currentReports) =>
      currentReports.map((r) => {
        if (r.id !== id) return r;
        const already = r.myParticipation?.[type] ?? false;
        const countKey = type === 'participating' ? 'participants' : 'helpers';
        const nextMyParticipation = {
          ...r.myParticipation,
          [type]: !already,
        };
        const newCount = Math.max(0, (r[countKey] ?? 0) + (already ? -1 : 1));

        void (async () => {
          if (!currentUserId) return;
          try {
            const action = already ? 'remove' : 'add';
            const resp = await fetch(`${API}/api/relatorios/${id}/participacoes`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ usuario_id: currentUserId, tipo_participacao: type, action }),
            });
            if (!resp.ok) throw new Error('Falha ao atualizar participação');
            const summary = await resp.json();
            setReports((cur) =>
              cur.map((rr) =>
                rr.id === id
                  ? {
                      ...rr,
                      participants: type === 'participating' ? summary.participantes : rr.participants,
                      helpers: type === 'helping' ? summary.ajudantes : rr.helpers,
                      myParticipation: {
                        ...rr.myParticipation,
                        [type]: !already,
                      },
                    }
                  : rr
              )
            );
          } catch (error) {
            console.error('Erro ao atualizar participação', error);
          }
        })();

        return {
          ...r,
          [countKey]: newCount,
          myParticipation: nextMyParticipation,
        };
      })
    );
  };

  const addChatMessage = async (id, text) => {
    const author = currentUserName || 'Você';
    try {
      const resp = await fetch(`${API}/api/relatorios/${id}/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ autor: author, texto: text }),
      });
      const created = await resp.json();
      const chatMessage = {
        id: created?.id ?? Date.now(),
        author: created?.autor || author,
        text: created?.texto || text,
        date: created?.criado_em || new Date().toISOString(),
        authorName: created?.autor || author,
        isMine: true,
      };
      setReports((cur) => cur.map((r) => (r.id === id ? { ...r, chat: [...(r.chat || []), chatMessage] } : r)));
    } catch (e) {
      const message = {
        id: Date.now(),
        author,
        text,
        date: new Date().toISOString(),
        authorName: author,
        isMine: true,
      };
      setReports((cur) => cur.map((r) => (r.id === id ? { ...r, chat: [...(r.chat || []), message] } : r)));
    }
  };

  const addHelpOffer = async (id, offer) => {
    try {
      const resp = await fetch(`${API}/api/relatorios/${id}/ofertas-ajuda`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nome: offer.name || offer.nome, telefone: offer.phone || offer.telefone, mensagem: offer.message || offer.mensagem }),
      });
      const created = await resp.json();
      setReports((cur) => cur.map((r) => (r.id === id ? { ...r, helpers: (r.helpers || 0) + 1, helpOffers: [...(r.helpOffers||[]), created] } : r)));
    } catch (e) {
      const helpEntry = { id: Date.now(), ...offer, date: new Date().toLocaleString() };
      setReports((cur) => cur.map((r) => (r.id === id ? { ...r, helpers: (r.helpers||0)+1, helpOffers: [...(r.helpOffers||[]), helpEntry] } : r)));
    }
  };

  const removeHelpOffer = (id) => {
    setReports((currentReports) =>
      currentReports.map((r) => {
        if (r.id !== id) return r;
        return {
          ...r,
          helpers: Math.max(0, (r.helpers ?? 0) - 1),
          helpOffers: (r.helpOffers ?? []).slice(0, -1),
          myParticipation: {
            ...r.myParticipation,
            helping: false,
          },
        };
      })
    );
  };

  return {
    reports,
    filteredReports,
    stats,
    filterUrgency,
    setFilterUrgency,
    filterStatus,
    setFilterStatus,
    searchTerm,
    setSearchTerm,
    addReport,
    updateReport,
    deleteReport,
    toggleParticipation,
    addChatMessage,
    loadReportDetails,
    addHelpOffer,
    removeHelpOffer,
  };
}
