/* ==========================================================================
 * LABORATÓRIO PRÁTICO: Manipulação de Eventos e DOM - Banco SENAC
 * Nome do Aluno: Murilo Calixto
 * ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

    // ==========================================================================
    // FASE 1: Ciclo de Vida e Inicialização
    // ==========================================================================
    const titulo = document.getElementById('titulo-banco');
    const container = document.getElementById('container');
    const inputConta = document.getElementById('input-conta');
    const inputSenha = document.getElementById('input-senha');
    const btnEntrar = document.getElementById('btn-entrar');
    const mensagemAviso = document.getElementById('mensagem-aviso');

    titulo.textContent = 'Banco SENAC - Acesso';
    console.log('DOM carregado.');


    // ==========================================================================
    // FASE 2: Eventos de Foco e Perda de Foco
    // ==========================================================================
    inputConta.addEventListener('focus', () => {
        inputConta.classList.add('borda-destaque');
        mensagemAviso.textContent = 'Digite o número da sua conta.';
    });

    inputConta.addEventListener('blur', () => {
        inputConta.classList.remove('borda-destaque');
        mensagemAviso.textContent = '';
    });

    inputSenha.addEventListener('focus', () => {
        inputSenha.classList.add('borda-destaque');
        mensagemAviso.textContent = 'Digite uma senha com pelo menos 5 caracteres.';
    });

    inputSenha.addEventListener('blur', () => {
        inputSenha.classList.remove('borda-destaque');
        mensagemAviso.textContent = '';
    });


    // ==========================================================================
    // FASE 3: Eventos de Mouse
    // ==========================================================================
    container.addEventListener('mouseenter', () => {
        container.classList.add('mouse-no-container');
    });

    container.addEventListener('mouseleave', () => {
        container.classList.remove('mouse-no-container');
    });


    // ==========================================================================
    // FASE 4: Eventos de Teclado e Validação Dinâmica
    // ==========================================================================
    inputConta.addEventListener('keydown', (evento) => {
        console.log('Tecla pressionada:', evento.key);
    });

    function validarAcesso() {
        const conta = inputConta.value.trim();
        const senha = inputSenha.value;

        if (conta !== '' && senha.length >= 5) {
            btnEntrar.classList.remove('escondido');
            mensagemAviso.textContent = 'Dados preenchidos. Você pode entrar.';
        } else {
            btnEntrar.classList.add('escondido');

            if (conta === '') {
                mensagemAviso.textContent = 'Preencha o número da conta.';
            } else {
                mensagemAviso.textContent = 'A senha precisa ter pelo menos 5 caracteres.';
            }
        }
    }

    inputConta.addEventListener('keyup', validarAcesso);
    inputSenha.addEventListener('keyup', validarAcesso);


    // ==========================================================================
    // FASE 5: Ação de Clique
    // ==========================================================================
    btnEntrar.addEventListener('click', () => {
        alert(`Acesso realizado com sucesso para a conta ${inputConta.value.trim()}!`);
    });

});