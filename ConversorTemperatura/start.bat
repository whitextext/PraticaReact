@echo off
setlocal

:: ==========================================
:: 1. CONFIGURAÇÃO DO AMBIENTE PORTÁTIL
:: ==========================================
SET "PROJETO_DIR=%~dp0"
SET "NODE_HOME=%PROJETO_DIR%.runtime"

:: Adiciona o Node ao PATH temporário
SET "PATH=%NODE_HOME%;%PATH%"

cls
echo ==========================================
echo      AMBIENTE DE DESENVOLVIMENTO
echo ==========================================
echo [STATUS] Modo Portatil Ativado.
echo [CHECK]  Caminho do Node: %NODE_HOME%
node -v >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERRO]   Node.js nao encontrado na pasta .runtime!
    echo          Certifique-se de extrair o zip do Node aqui.
    pause
    exit /b
)
echo [OK]     Node detectado com sucesso.
echo.

:: ==========================================
:: 2. VERIFICAÇÃO DE DEPENDÊNCIAS
:: ==========================================
if exist "%PROJETO_DIR%node_modules" (
    echo [INFO]   Dependencias ja instaladas.
    echo [SKIP]   Pulando etapa 'npm install'.
) else (
    echo [AVISO]  Dependencias nao encontradas - Primeira Execucao.
    echo [ACAO]   Instalando pacotes... Aguarde...
    call npm install
    if %errorlevel% neq 0 (
        echo [ERRO] Falha na instalacao das dependencias.
        pause
        exit /b
    )
    echo [OK]     Instalacao concluida.
)
echo.

:: ==========================================
:: 3. VERIFICAÇÃO DE BUILD (INTEGRIDADE)
:: ==========================================
echo [ACAO]   Verificando integridade do codigo - Build...
call npm run build
if %errorlevel% neq 0 (
    echo.
    echo [ERRO]   O build falhou! Verifique os erros no codigo acima.
    echo          O servidor nao sera iniciado para evitar execucao de codigo quebrado.
    pause
    exit /b
)
echo [OK]     Codigo validado.
echo.

:: ==========================================
:: 4. INICIALIZAÇÃO DO SERVIDOR
:: ==========================================
echo [ACAO]   Iniciando aplicacao...
echo.
call npm run dev

:: Se o servidor cair ou você der Ctrl+C, ele pausa para você ler o erro
pause