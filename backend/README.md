# Backend

Para executar o projeto projeto do backend da Medicar, siga os seguintes passos:

- Crie um ambiente virtual (recomendado o Anaconda, pois foi o utilizado para desenvolvimento, mas também pode ser usado outra ferramenta) com o seguinte comando:
 
  ``conda create -n medicar python=3.7``
- Após criado o ambiente, para acessá-lo bastar utilizar o comando:
   
  ``conda activate medicar``
 
   note que o nome "medicar" pode ser substituído por qualquer outro nome de sua proeferência.
- Agora é necessário criar um banco de dados para a aplicação. Recomendo criar um banco com o nome "medicar_db", que é o nome configurado no projeto. Sugiro utilizar o [pgAdmin](https://www.pgadmin.org/download/) para facilitar nessa parte.
 - Uma vez com o banco criado, é preciso configurar as credenciais de acesso para que o Django consiga acessar esse banco. No arquivo ./backend/medicarapi/settings.py, da linha 96 até a 107 há as configurações de acesso.
   ```python
    DATABASES = {
    'default': {
        #"'ENGINE': 'django.db.backends.sqlite3',
        #'NAME': os.path.join(BASE_DIR, 'db.sqlite3'),
        'ENGINE': 'django.db.backends.postgresql_psycopg2',
        'NAME': os.environ.get('DB_NAME', 'medicar_db'),
        'USER': os.environ.get('DB_USER', 'postgres'),
        'PASSWORD': os.environ.get('DB_PASS', 'admin'),
        'HOST': 'localhost',
        'PORT': '5432'
    }
   }
   ```
   Aqui, as seguintes opções terão que ser alteradas: 
   - 'NAME', caso o banco do item anterior tenha sido criado com outro nome. Caso contrário, não precisa alterar essa linha. 
   -  'USER' é o usuário que irá acessar esse banco. Por padrão na instalação o postgreSQL cria um usuário com nome postgres na instalaçaõ. Caso tenha outro usuáiro configurado, é só substituir 'postgres' pelo nome.
   -  'DB_PASS' é o password para o usuário informado no item anterior. Caso seja 'postgres', usar a senha informada ao instalar o PostgreSQL.

Feito isso, caso tudo tenha sido configurado corretamente, basta gerar as migrations: ``python manage.py makemigrations``. Uma vez geradas as migrations, basta aplicá-las: ``python manage.py migrate``. 

Com as migrations aplicadas, crie um super usuário com o comando ``python manage.py createsuperuser``.

Execute o comando ``python manage.py runserver`` e logue com o usuário criado acessando o endereço [``http://127.0.0.1:8000/admin/``](http://127.0.0.1:8000/admin/).

Para completar, acesse o endereço [``http://127.0.0.1:8000/o/applications/register/``](http://127.0.0.1:8000/o/applications/register/). Utilize os seguintes dados para registrar uma aplicação:

  - Name: Informe qualquer nome que tenha relação com a aplicação Medicar.
  - Client id: Manter o valor padrão.
  - Client secret: Manter o valor padrão
  - Client type: Selecione "Confidential".
  - Authorization grant type: Selecione "Resource owner password-based";
  - Redirect uris: Não precisa ser preenchido.

Clicando em "Save", o backend já estará configurado para uso. Importante: Guarde os valores de "Client id" e "Client secret". Eles serão necessários para configurar o frontend.

# Fim