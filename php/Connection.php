<?php

/**
 * Classe que implementa o padrão Factory, cujo papel será instanciar
 * um objeto PDO de acordo com as informações de contidas no arquivo
 * de configuração.
 */
class Connection {

     const TYPE = 'mysql';
     const HOST = 'localhost';
     const NAME = 'financas';
     const USER = 'root';
     const PASS = '';
     const PORT = '3306';
    
    // Construtor privado para evitar instanciação da classe
    private function __construct() {}
        
    /**
     * Prover objetos PDO
     * 
     * Banco de dados suportados - MySQL
     * @return PDO Instância da conexão PDO
     */
    public static function open() {
        // Descobre qual o tipo de driver deve ser utilizado para a conexão
        switch (self::TYPE) {
            case 'mysql':
                $port = self::PORT ? self::PORT : '3306';
                $conn = new PDO("mysql:host=" . self::HOST . ";port={$port};dbname=" . self::NAME, self::USER, self::PASS, [PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8"]);
                break;
        }

        // Configura o PDO lance exceções na ocorrência de erros
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        return $conn;
    }
}