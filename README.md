# Cooking Recipe System

React App with Symfony For Cooking recipes

## Requirements:

* PHP: 8.2+ with [PDO and PDO_MYSQL extensions](https://www.php.net/manual/en/pdo.installation.php) installed and enabled
* PosgreSQL: 16
* Composer: 2.0+
* NodeJS: 20+ 


## Setup

### Docker
* Run the containers
```
 docker compose up -d
```

* Execute the migrations
```
docker container exec -it cooking-recipes-server sh -c "php bin/console doctrine:migrations:migrate"
```

* If you want dummy data for dev env (Warning do not use on prod env):
```
docker container exec -it cooking-recipes-server sh -c "bin/console doctrine:fixtures:load"
```

### Manual
* Execute composer:

```
composer install
```
* Configure your PostgreSQL credentials in .env

* Build the database and the schema with:
```
php bin/console doctrine:database:create --if-not-exists
php bin/console doctrine:migrations:migrate
```

* If you want dummy data for dev env (Warning do not use on prod env):
```
php bin/console doctrine:fixtures:load
```

* Install node modules
```
npm install
```

* Run with symfony cli:
```
symfony serve
```

* Run with npm:
```
npm run watch
```

## Routes:
Api documentation:
``
/api/docs
``

React App:
``
/
``