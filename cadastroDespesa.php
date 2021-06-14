<!DOCTYPE html>
<html lang="pt-br">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Cadastro Despesa</title>
</head>

<body>
    <div class="container">
        <form>
            <h1 class="mt-5 text-center">Cadastrar Despesa</h1>
            <div class="alert alert-success text-center" role="alert"></div>

            <input type="hidden" name="id" id="id">

            <div class="mb-3">
                <label for="despesa" class="form-label">Valor da Despesa</label>
                <input type="text" name="despesa" id="despesa" class="form-control" autofocus>
            </div>

            <div class="mb-3">
                <label for="data" class="form-label">Data</label>
                <input type="date" name="data" id="data" class="form-control">
            </div>

            <div class="mb-3">
                <label for="descricao" class="form-label">Descrição</label>
                <input type="text" name="descricao" id="descricao" class="form-control">
            </div>

            <div class="mb-3">
                <label for="categoria" class="form-label">Categoria</label>
                <select name="categoria" id="categoria" class="form-control">
                    <option value="0" selected></option>
                    <option value="1">Casa</option>
                    <option value="2">Carro</option>
                    <option value="3">Alimentação</option>
                    <option value="3">Animais de Estimação</option>
                </select>
            </div>

            <div class="mb-3" >
                <label for="pagamento" class="form-label">Forma de Pagamento</label>
                <select name="pagamento" id="pagamento" class="form-control">
                    <option value="0" selected></option>
                    <option value="1">Cartão de Crédito</option>
                    <option value="2">Débito</option>
                    <option value="3">Dinheiro</option>
                </select>
            </div>

            <!-- Esse select só aparece quando é selecionado a opção Cartão de Crédito -->
            <div class="mb-3" id="opcao">
                <label for="parcelas" class="form-label">Parcelas</label>
                <select name="parcelas" id="parcelas" class="form-control">
                    <option value="1" selected>1x</option>
                    <option value="2">2x</option>
                    <option value="3">3x</option>>
                </select>
            </div>

            <div class="form-check mb-3">
                <input class="form-check-input" type="checkbox" id="pago" name="pago">
                <label class="form-check-label" for="pago">
                    Pago?
                </label>
            </div>

            <div class="d-grid gap-2">
                <button class="btn btn-primary" type="button" id="cadastrar">Cadastrar</button>
                <button class="btn btn-secondary" type="reset">Limpar</button>
            </div>
        </form>
    </div>

    <script src="https://ajax.aspnetcdn.com/ajax/jQuery/jquery-3.6.0.min.js"></script>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js"></script>
    <script src="js/jquery.mask.min.js"></script>
    <script src="js/script.js"></script>
</body>

</html>