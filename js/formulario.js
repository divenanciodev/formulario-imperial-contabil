// formulario.js - versão ajustada para evitar preflight CORS
// ATENÇÃO: substitua o valor de APPS_SCRIPT_URL pela URL do deploy do seu Web App do Google Apps Script.
const APPS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbynepngEGqRzYJ484xcVh3Jgpz94YODh0q7RtoVwf8P5xuGzHxj2iVQVTu4yRPBmXKf/exec";
const SECRET_TOKEN = "Impe@!&_Co@B&%$lid@de";

document.addEventListener("DOMContentLoaded", function () {

  // ---------- show step ----------
  function showStep(step) {
    document.querySelectorAll(".form-step").forEach(div => div.style.display = "none");
    const currentStep = document.getElementById(`form-step-${step}`);
    if (currentStep) currentStep.style.display = "block";

    document.querySelectorAll(".step").forEach(stepDiv => stepDiv.classList.remove("active"));
    const activeStep = document.querySelector(`.step[data-step="${step}"]`);
    if (activeStep) activeStep.classList.add("active");
  }

  // inicial
  showStep(1);

  // ---------- navegação ----------
  document.getElementById("btn-next-1")?.addEventListener("click", e => { e.preventDefault(); showStep(2); });
  document.getElementById("btn-prev-2")?.addEventListener("click", e => { e.preventDefault(); showStep(1); });
  document.getElementById("btn-next-2")?.addEventListener("click", e => { e.preventDefault(); showStep(3); });
  document.getElementById("btn-prev-3")?.addEventListener("click", e => { e.preventDefault(); showStep(2); });

  // ---------- modal privacidade ----------
  const privacyLink = document.querySelector('[data-bs-toggle="modal"]');
  if (privacyLink) {
    privacyLink.addEventListener("click", function (e) {
      e.preventDefault();
      const modalEl = document.getElementById("privacy-modal");
      if (modalEl) new bootstrap.Modal(modalEl).show();
    });
  }

  // ---------- máscaras e formatação ----------
  const capitalInput = document.getElementById('capitalSocial');
  if (capitalInput) {
    capitalInput.addEventListener('input', function () {
      let value = this.value.replace(/\D/g, '');
      value = (Number(value) / 100).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
      this.value = value;
    });
  }

  function mascaraTelefone(inputElement) {
    let v = inputElement.value.replace(/\D/g, '');
    if (v.length > 10) {
      v = v.replace(/^(\d{2})(\d{1})(\d{4})(\d{4}).*/, '($1) $2$3-$4');
    } else if (v.length > 9) {
      v = v.replace(/^(\d{2})(\d{4})(\d{4}).*/, '($1) $2-$3');
    }
    inputElement.value = v;
  }

  document.getElementById('telefone')?.addEventListener('input', function () { mascaraTelefone(this); });
  document.getElementById('celular')?.addEventListener('input', function () { mascaraTelefone(this); });

  // ---------- validação de email ----------
  const emailInput = document.getElementById('email');
  const emailError = document.getElementById('email-error');

  emailInput?.addEventListener('input', function () {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (this.value === "" || regex.test(this.value)) {
      emailError.style.display = "none";
      this.style.borderColor = "";
    } else {
      emailError.style.display = "block";
      this.style.borderColor = "red";
    }
  });

  // ---------- cep e uf ----------
  document.getElementById('cep')?.addEventListener('input', function () {
    let value = this.value.replace(/\D/g, '');
    if (value.length > 5) value = value.slice(0, 5) + '-' + value.slice(5, 8);
    this.value = value;
  });

  document.getElementById('uf')?.addEventListener('input', function () {
    this.value = this.value.toUpperCase();
  });

  // ---------- capitalize ----------
  function capitalizeWords(inputElement) {
    inputElement.addEventListener('input', function () {
      this.value = this.value.replace(/\b\w/g, l => l.toUpperCase());
    });
  }

  ['razaoSocial', 'razaoSocial2', 'razaoSocial3', 'nomeFantasia'].forEach(id => {
    const el = document.getElementById(id);
    if (el) capitalizeWords(el);
  });

  // ---------- coletar dados ----------
  function coletarDados() {
    return {
      razaoSocial: razaoSocial.value || "",
      razaoSocial2: razaoSocial2.value || "",
      razaoSocial3: razaoSocial3.value || "",
      nomeFantasia: nomeFantasia.value || "",
      telefone: telefone.value || "",
      celular: celular.value || "",
      email: email.value || "",
      endereco: endereco.value || "",
      numero: numero.value || "",
      logradouro: logradouro.value || "",
      complemento: complemento.value || "",
      bairro: bairro.value || "",
      cidade: cidade.value || "",
      uf: uf.value || "",
      cep: cep.value || "",
      referencia: referencia.value || "",
      tipoJuridico: tipoJuridico.value || "",
      porteEmpresa: porteEmpresa.value || "",
      objetivoSocial: objetivoSocial.value || "",
      regimeTributario: regimeTributario.value || "",
      capitalSocial: capitalSocial.value || "",
      socio1: document.querySelector('input[name="socio1"]:checked')?.value || "",
      socio2: document.querySelector('input[name="socio2"]:checked')?.value || "",
      socio3: document.querySelector('input[name="socio3"]:checked')?.value || "",
      privacyAccepted: document.getElementById("privacy-policy")?.checked || false,
      submittedAt: new Date().toISOString()
    };
  }

  // ---------- enviar via fetch normal ----------
  async function enviarFetchNormal(data) {
    const resp = await fetch(APPS_SCRIPT_URL, {
      method: "POST",
      body: JSON.stringify(data)
    });

    const text = await resp.text();
    try {
      return { ok: resp.ok, json: JSON.parse(text), status: resp.status };
    } catch (e) {
      return { ok: resp.ok, json: {}, status: resp.status, text };
    }
  }

  // ---------- fallback no-cors ----------
  async function enviarNoCors(data) {
    try {
      await fetch(APPS_SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        body: JSON.stringify(data)
      });
      return { ok: true, noresponse: true };
    } catch (err) {
      return { ok: false, error: err };
    }
  }

  // ---------- rotina principal ----------
  async function enviarDados() {
    const data = coletarDados();

    if (!data.razaoSocial || !data.nomeFantasia || !data.email) {
      alert("Preencha os campos obrigatórios (Razão social, Nome fantasia, Email).");
      return { ok: false };
    }

    if (!data.privacyAccepted) {
      document.getElementById("privacy-error").style.display = "block";
      return { ok: false };
    }

    data._token = SECRET_TOKEN;

    try {
      const resp = await enviarFetchNormal(data);
      if (resp.ok && resp.json.status === "ok") return { ok: true };
      throw new Error("fallback");
    } catch {
      return await enviarNoCors(data);
    }
  }

  // ---------- botão finalizar ----------
  document.getElementById("btn-next-3")?.addEventListener("click", async function (e) {
    e.preventDefault();

    const btn = this;
    btn.disabled = true;
    const original = btn.innerText;
    btn.innerText = "Enviando...";

    const result = await enviarDados();

    btn.disabled = false;
    btn.innerText = original;

    if (result.ok) {
      alert("Dados enviados com sucesso!");

      showStep(1);

      // ---------- LIMPAR FORMULÁRIO COMPLETO ----------
      document.querySelectorAll('input[type="text"], input[type="email"], textarea')
        .forEach(c => c.value = "");

      document.querySelectorAll('input[type="radio"], input[type="checkbox"]')
        .forEach(c => c.checked = false);

      document.querySelectorAll('select')
        .forEach(s => s.selectedIndex = 0);

    } else {
      alert("Falha ao enviar. Tente novamente.");
    }
  });

}); // fim DOMContentLoaded
