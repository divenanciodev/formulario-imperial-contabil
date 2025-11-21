
document.addEventListener("DOMContentLoaded", function () {

    function showStep(step) {

        document.querySelectorAll(".form-step").forEach(div => div.style.display = "none");

        const currentStep = document.getElementById(`form-step-${step}`);
        if (currentStep) currentStep.style.display = "block";

        document.querySelectorAll(".step").forEach(stepDiv => stepDiv.classList.remove("active"));
        const activeStep = document.querySelector(`.step[data-step="${step}"]`);
        if (activeStep) activeStep.classList.add("active");
    }

    const btnNext1 = document.getElementById("btn-next-1");
    if (btnNext1) {
        btnNext1.addEventListener("click", function () {
            showStep(2);
        });
    }

    const btnPrev2 = document.getElementById("btn-prev-2");
    if (btnPrev2) {
        btnPrev2.addEventListener("click", function () {
            showStep(1);
        });
    }

    const btnNext2 = document.getElementById("btn-next-2");
    if (btnNext2) {
        btnNext2.addEventListener("click", function () {
            showStep(3);
        });
    }

    const btnPrev3 = document.getElementById("btn-prev-3");
    if (btnPrev3) {
        btnPrev3.addEventListener("click", function () {
            showStep(2);
        });
    }

    const privacyLink = document.getElementById('privacy-link');
    if (privacyLink) {
        privacyLink.addEventListener('click', function (e) {
            e.preventDefault();
            const modal = new bootstrap.Modal(document.getElementById('privacy-modal'));
            modal.show();
        });
    }

    const closeModal = document.getElementById('close-modal');
    if (closeModal) {
        closeModal.addEventListener('click', function () {
            const modal = new bootstrap.Modal(document.getElementById('privacy-modal'));
            modal.hide();
        });
    }

    const btnNext3 = document.getElementById("btn-next-3");
    if (btnNext3) {
        btnNext3.addEventListener("click", function (event) {

            const privacyPolicyCheckbox = document.getElementById("privacy-policy");
            const warningBox = document.getElementById("privacy-warning");

            if (privacyPolicyCheckbox && !privacyPolicyCheckbox.checked) {
                event.preventDefault();
                if (warningBox) warningBox.style.display = "block";
                return;
            }
        
            if (warningBox) warningBox.style.display = "none";
            alert("Finalização bem-sucedida!");
        });
    }

    const capitalInput = document.getElementById('capitalSocial');
    if (capitalInput) {
        capitalInput.addEventListener('input', function () {
            let value = this.value.replace(/\D/g, '');
            value = (Number(value) / 100).toLocaleString('pt-BR', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            });
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

    const telInput = document.getElementById('telefone');
    if (telInput) {
        telInput.addEventListener('input', function () {
            mascaraTelefone(this);
        });
    }

    const celInput = document.getElementById('celular');
    if (celInput) {
        celInput.addEventListener('input', function () {
            mascaraTelefone(this);
        });
    }

    const emailInput = document.getElementById('email');
    const emailError = document.getElementById('email-error');

    if (emailInput) {
        emailInput.addEventListener('input', function () {
            const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (this.value === "" || regex.test(this.value)) {
                if (emailError) emailError.style.display = "none";
                this.style.borderColor = "";
            } else {
                if (emailError) emailError.style.display = "block";
                this.style.borderColor = "red";
            }
        });
    }

    const cepInput = document.getElementById('cep');
    if (cepInput) {
        cepInput.addEventListener('input', function () {
            let value = this.value.replace(/\D/g, '');
            if (value.length > 5) {
                value = value.slice(0, 5) + '-' + value.slice(5, 8);
            }
            this.value = value;
        });
    }

    const ufInput = document.getElementById('uf');
    if (ufInput) {
        ufInput.addEventListener('input', function () {
            this.value = this.value.toUpperCase();
        });
    }

    function capitalizeWords(inputElement) {
        inputElement.addEventListener('input', function () {
            this.value = this.value.replace(/\b\w/g, function (l) {
                return l.toUpperCase();
            });
        });
    }

    function safeCapitalize(id) {
        const field = document.getElementById(id);
        if (field) capitalizeWords(field);
    }

    safeCapitalize('razaoSocial');
    safeCapitalize('razaoSocial2');
    safeCapitalize('razaoSocial3');
    safeCapitalize('nomeFantasia');

});

document.addEventListener("DOMContentLoaded", function () {

    function showStep(step) {

        document.querySelectorAll(".form-step").forEach(div => div.style.display = "none");

        const currentStep = document.getElementById(`form-step-${step}`);
        if (currentStep) currentStep.style.display = "block";

        document.querySelectorAll(".step").forEach(stepDiv => stepDiv.classList.remove("active"));
        const activeStep = document.querySelector(`.step[data-step="${step}"]`);
        if (activeStep) activeStep.classList.add("active");
    }

    const btnNext1 = document.getElementById("btn-next-1");
    if (btnNext1) {
        btnNext1.addEventListener("click", () => showStep(2));
    }

    const btnPrev2 = document.getElementById("btn-prev-2");
    if (btnPrev2) {
        btnPrev2.addEventListener("click", () => showStep(1));
    }

    const btnNext2 = document.getElementById("btn-next-2");
    if (btnNext2) {
        btnNext2.addEventListener("click", () => showStep(3));
    }

    const btnPrev3 = document.getElementById("btn-prev-3");
    if (btnPrev3) {
        btnPrev3.addEventListener("click", () => showStep(2));
    }

    const privacyLink = document.getElementById("privacy-link");
    if (privacyLink) {
        privacyLink.addEventListener("click", function (e) {
            e.preventDefault();

            const modalElement = document.getElementById("privacy-modal");
            if (modalElement) {
                const modal = new bootstrap.Modal(modalElement);
                modal.show();
            }
        });
    }

    const closeModal = document.getElementById("close-modal");
    if (closeModal) {
        closeModal.addEventListener("click", function () {
            const modalElement = document.getElementById("privacy-modal");
            if (modalElement) {
                const modal =
                    bootstrap.Modal.getInstance(modalElement) ||
                    new bootstrap.Modal(modalElement);
                modal.hide();
            }
        });
    }

    const btnNext3 = document.getElementById("btn-next-3");
    if (btnNext3) {
        btnNext3.addEventListener("click", function (event) {

            const privacyPolicyCheckbox = document.getElementById("privacy-policy");
            const warningBox = document.getElementById("privacy-warning");

            if (privacyPolicyCheckbox && !privacyPolicyCheckbox.checked) {
                event.preventDefault();
                if (warningBox) warningBox.style.display = "block";
                return;
            }

            if (warningBox) warningBox.style.display = "none";
            alert("Finalização bem-sucedida!");
        });
    }

    const capitalInput = document.getElementById('capitalSocial');
    if (capitalInput) {
        capitalInput.addEventListener('input', function () {
            let value = this.value.replace(/\D/g, '');
            value = (Number(value) / 100).toLocaleString('pt-BR', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            });
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

    const telInput = document.getElementById('telefone');
    if (telInput) {
        telInput.addEventListener('input', function () {
            mascaraTelefone(this);
        });
    }

    const celInput = document.getElementById('celular');
    if (celInput) {
        celInput.addEventListener('input', function () {
            mascaraTelefone(this);
        });
    }

    const emailInput = document.getElementById('email');
    const emailError = document.getElementById('email-error');

    if (emailInput) {
        emailInput.addEventListener('input', function () {
            const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (this.value === "" || regex.test(this.value)) {
                if (emailError) emailError.style.display = "none";
                this.style.borderColor = "";
            } else {
                if (emailError) emailError.style.display = "block";
                this.style.borderColor = "red";
            }
        });
    }

    const cepInput = document.getElementById('cep');
    if (cepInput) {
        cepInput.addEventListener('input', function () {
            let value = this.value.replace(/\D/g, '');
            if (value.length > 5) {
                value = value.slice(0, 5) + '-' + value.slice(5, 8);
            }
            this.value = value;
        });
    }

    const ufInput = document.getElementById('uf');
    if (ufInput) {
        ufInput.addEventListener('input', function () {
            this.value = this.value.toUpperCase();
        });
    }

    function capitalizeWords(inputElement) {
        inputElement.addEventListener('input', function () {
            this.value = this.value.replace(/\b\w/g, function (l) {
                return l.toUpperCase();
            });
        });
    }

    function safeCapitalize(id) {
        const field = document.getElementById(id);
        if (field) capitalizeWords(field);
    }

    safeCapitalize('razaoSocial');
    safeCapitalize('razaoSocial2');
    safeCapitalize('razaoSocial3');
    safeCapitalize('nomeFantasia');

});

document.getElementById("btn-next-3").addEventListener("click", function (event) {
    const checkbox = document.getElementById("privacy-policy");
    const errorMsg = document.getElementById("privacy-error");

    if (!checkbox.checked) {
        event.preventDefault();
        errorMsg.style.display = "block";
    } else {
        errorMsg.style.display = "none";
    }
});