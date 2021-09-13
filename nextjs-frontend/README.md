![Next.js](../img/nextjs.png)

# Imersão Full Stack & FullCycle 4.0 - FinCycle - Front-end das transações

## Descrição

Repositório do front-end das transações feito com Next.js

**Importante**: A aplicação do Apache Kafka, Keycloak, Back-end Nest.js devem estar rodando primeiro.

## Rodar a aplicação

### Configurar /etc/hosts

A comunicação entre as aplicações se dá de forma direta através da rede da máquina.
Para isto é necessário configurar um endereços que todos os containers Docker consigam acessar.

Acrescente no seu /etc/hosts (para Windows o caminho é C:\Windows\system32\drivers\etc\hosts):
```
127.0.0.1 host.docker.internal tenant1.docker.internal tenant2.docker.internal
```
Em todos os sistemas operacionais é necessário abrir o programa para editar o *hosts* como Administrator da máquina ou root.

Execute os comandos:

```
docker-compose up
```

Acessar http://localhost:3001.

Quer configurar um ambiente de desenvolvimento produtivo? Veja o vídeo: [https://www.youtube.com/watch?v=HmMNKdHmqC4](https://www.youtube.com/watch?v=HmMNKdHmqC4) 

### Para Windows 

Siga o guia rápido de instalação: [https://github.com/codeedu/wsl2-docker-quickstart](https://github.com/codeedu/wsl2-docker-quickstart) 
