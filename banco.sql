-- Criar um banco de dados chamado pets_api	

-- Criar a tabela pets

create table pets (
codigo serial not null primary key, 
nome varchar(50) not null,
peso decimal(10,2) not null,
raca varchar(50) not null,
especie varchar(50) not null);

-- inserir alguns registros
insert into pets (nome, peso, raca, especie) values ('Mel', 9.5, 'SRD', 'Cachorro'), ('Pixie', 5.2, 'SRD', 'Gato');