const API_BASE = "http://127.0.0.1:8000/api/v1";

export const api = {
  checkHardware: async () => {
    const res = await fetch(`${API_BASE}/system/hardware`);
    return res.json();
  },
  
  scanDirectory: async (path: string) => {
    const res = await fetch(`${API_BASE}/scan`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ directory_path: path, is_local_only: false })
    });
    return res.json();
  },

  hybridSearch: async (query: string, aiMode: string = "local") => {
    const res = await fetch(`${API_BASE}/search/hybrid`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query, top_k: 5, ai_mode: aiMode })
    });
    return res.json();
  },

  multimodalSearch: async (query: string) => {
    const res = await fetch(`${API_BASE}/search/multimodal`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query, top_k: 5 })
    });
    return res.json();
  },

  synthesizeDocument: async (mapping: any, filename: string) => {
    const res = await fetch(`${API_BASE}/document/synthesize?output_filename=${filename}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(mapping)
    });
    return res.json();
  },

  compareDocuments: async (docA: string, docB: string) => {
    const res = await fetch(`${API_BASE}/document/diff`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ doc_a_text: docA, doc_b_text: docB })
    });
    return res.json();
  },

  getBalance: async () => {
    const res = await fetch(`${API_BASE}/billing/balance`);
    return res.json();
  },

  rechargeCredit: async (amount: number) => {
    const res = await fetch(`${API_BASE}/billing/recharge`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount, user_id: "default_user" })
    });
    return res.json();
  }
};
