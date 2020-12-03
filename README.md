# Descomplica API

## Simulação

1. ~Criar simulação~
    * dados: cpf, email, telefone e nome (consulta se já existe prospect com este cpf)

2. ~Buscar dados de simulação do lote na sankhya e retornar~

3. ~Reservar atendimento~
    * reserva na sankhya com os dados de simulação: cpf, email, telefone e nome
    * envia proposta - cabeçalho

4. ~Adicionar comprador com documentos em base64~
    * add comprador na sankhya e add arquivos do comprador
    * add conjugue do comprador na sankhya e add arquivos do conjugue
    * envia proposta - compradores

6. Adicionar parcelas com datas de comissões

7. ~Enviar proposta~
    * gera proposta
