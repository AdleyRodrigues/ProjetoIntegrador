<!DOCTYPE html>
<html lang="pt-br">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet"
        integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">

    <link rel="stylesheet" href="css/homeDespesa.css">
    <title>Home Despesa</title>
</head>

<body>
    <div class="container">
        <h1>Despesas cadastradas</h1> <br>
        <hr>
        <a href="#" onclick="PopUps.open()" class="button new">+ Nova Despesa</a> <br>
        <table class="table table-bordered table-hover">
            
            <thead>
                <tr>
                    <th scope="col">Descrição</th>
                    <th scope="col">Valor </th>
                    <th scope="col">Categoria</th>
                    <th scope="col">Forma de Pagamento</th>
                    <th scope="col">Data</th>
                    <th scope="col">Situação</th>
                </tr>
            </thead>
            <tbody>
                
                <tr>                 <!-- Daqui -->
                    <td>internet</td>
                    <td>R$ 70,00</td>
                    <td>Casa</td>
                    <td>Dinheiro</td>
                    <td>23/04/2021</td>
                    <td>pago</td>
                </tr>
                               <!-- ate aqui vai sumir -->
            </tbody>
        </table>
    </div>


    <div class="modal-overlay">
        <div class="modall">
            <div class="form container">
                <form>
                    <div class="mb-3">
                        <label for="descricao" class="form-label">Descrição</label>
                        <input type="text" name="descricao" id="descricao" class="form-control" autofocus>
                    </div>
                    <div class="mb-3">
                        <label for="despesa" class="form-label">Valor da Despesa</label>
                        <input type="text" name="despesa" id="despesa" class="form-control">
                    </div>

                    <div class="mb-3">
                        <label for="categoria" class="form-label">Categoria</label>
                        <select name="categoria" id="categoria" class="form-control">
                            <option value="0" selected></option>
                            <option value="Casa">Casa</option>
                            <option value="Carro">Carro</option>
                            <option value="Alimentação">Alimentação</option>
                            <option value="Animais de Estimação">Animais de Estimação</option>
                        </select>
                    </div>

                    <div class="mb-3">
                        <label for="pagamento" class="form-label">Forma de Pagamento</label>
                        <select name="pagamento" id="pagamento" class="form-control">
                            <option value="0" selected></option>
                            <option value="Cartão de Crédito">Cartão de Crédito</option>
                            <option value="Débito">Débito</option>
                            <option value="Dinheiro">Dinheiro</option>
                        </select>
                    </div>

                    <div class="mb-3">
                        <label for="data" class="form-label">Data</label>
                        <input type="date" name="data" id="data" class="form-control">
                    </div>
                    <div class="form-check mb-3">
                        <input class="form-check-input" type="checkbox" id="pago" name="pago">
                        <label class="form-check-label" for="pago">
                            Pago?
                        </label>
                    </div>

                    <div class="d-grid gap-2">
                        <button class="btn btn-primary" onclick="inserir(); PopUps.close()" type="button" id="cadastrar">Cadastrar</button>
                        <button class="btn btn-secondary" type="reset">Limpar</button>
                        <a onclick="PopUps.close()" href="#" class="btn btn-tertiary">Cancelar</a>
                    </div>
                </form>
            </div>
        </div>
    </div>

    <script src="js/homeDespesa.js"></script>
</body>

</html>