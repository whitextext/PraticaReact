@echo off
setlocal

:: ==========================================
:: 1. CONFIGURAÇÃO DO AMBIENTE PORTÁTIL
:: ==========================================
SET "PROJETO_DIR=%~dp0"
SET "NODE_HOME=%PROJETO_DIR%.runtime"

:: Verifica se o runtime existe antes de tentar configurar
:: CORRECAO: Removidos parenteses do texto para evitar erro de sintaxe no IF
IF NOT EXIST "%NODE_HOME%\node.exe" (
    echo [ERRO] O Node.js portatil nao foi encontrado em:
    echo "%NODE_HOME%"
    echo.
    echo Certifique-se de baixar a versao ZIP do Node e extrair
    echo o conteudo - onde fica o node.exe - direto na pasta .runtime
    pause
    exit /b 1
)

:: Adiciona o Node ao PATH
SET "PATH=%NODE_HOME%;%PATH%"

:: ==========================================
:: 2. VERIFICAÇÃO E EXECUÇÃO
:: ==========================================

echo [STATUS] Verificando versoes...
echo Node: 
node -v
echo NPM: 
call npm -v 

echo.
echo [STATUS] Instalando dependencias...
call npm install
IF %ERRORLEVEL% NEQ 0 (
    echo [ERRO] Falha ao instalar dependencias.
    pause
    exit /b %ERRORLEVEL%
)

echo.
echo [STATUS] Fazendo Build do projeto...
call npm run build
IF %ERRORLEVEL% NEQ 0 (
    echo [ERRO] Falha no Build.
    pause
    exit /b %ERRORLEVEL%
)

echo.
echo [STATUS] Iniciando aplicacao...
call npm run dev

pause