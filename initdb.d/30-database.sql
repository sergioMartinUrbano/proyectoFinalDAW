\connect pokemon;

CREATE TABLE "pokemon" (
    "id_pokemon" SERIAL PRIMARY KEY,
    "type1" VARCHAR(255) CHECK ("type1" IN (
        'Steel', 'Water', 'Bug', 'Dragon', 'Electric', 'Ghost', 'Fire', 'Fairy', 'Ice',
        'Fighting', 'Normal', 'Grass', 'Psychic', 'Rock', 'Dark', 'Ground', 'Poison', 'Flying'
    )),
    "type2" VARCHAR(255) CHECK ("type2" IN (
        'Steel', 'Water', 'Bug', 'Dragon', 'Electric', 'Ghost', 'Fire', 'Fairy', 'Ice',
        'Fighting', 'Normal', 'Grass', 'Psychic', 'Rock', 'Dark', 'Ground', 'Poison', 'Flying'
    )),
    "name" VARCHAR(255) NOT NULL,
    "base_attack" SMALLINT NOT NULL,
    "base_special_attack" SMALLINT NOT NULL,
    "base_defense" SMALLINT NOT NULL,
    "base_special_defense" SMALLINT NOT NULL,
    "base_speed" SMALLINT NOT NULL,
    "base_hp" SMALLINT NOT NULL
);

CREATE TABLE "abilities" (
    "id_ability" SERIAL PRIMARY KEY,
    "name_es" VARCHAR(255) NOT NULL,
    "name_en" VARCHAR(255) NOT NULL,
    "description_en" TEXT NOT NULL,
    "description_es" TEXT NOT NULL
);

CREATE TABLE "pokemon_abilities" (
    "id_pokemon" INT NOT NULL,
    "id_ability" INT NOT NULL,
    "type" VARCHAR(255) NOT NULL DEFAULT 'primary' CHECK ("type" IN ('primary', 'hidden')),
    PRIMARY KEY("id_pokemon", "id_ability"),
    FOREIGN KEY ("id_pokemon") REFERENCES "pokemon"("id_pokemon"),
    FOREIGN KEY ("id_ability") REFERENCES "abilities"("id_ability")
);

CREATE TABLE "move" (
    "id_move" SERIAL PRIMARY KEY,
    "name_es" VARCHAR(255) NOT NULL,
    "name_en" VARCHAR(255) NOT NULL,
    "description_es" TEXT NOT NULL,
    "description_en" TEXT NOT NULL,
    "accuracy" INT,
    "power" INT,
    "type" VARCHAR(255) NOT NULL CHECK ("type" IN (
        'steel', 'water', 'bug', 'dragon', 'electric', 'ghost', 'fire', 'fairy', 'ice',
    'fighting', 'normal', 'grass', 'psychic', 'rock', 'dark', 'ground', 'poison', 'flying'
    )),
    "category" VARCHAR(255) NOT NULL CHECK ("category" IN ('physical', 'special', 'status'))
);

CREATE TABLE "move_pokemon" (
    "id_pokemon" INT NOT NULL,
    "id_move" INT NOT NULL,
    PRIMARY KEY("id_pokemon", "id_move"),
    FOREIGN KEY ("id_pokemon") REFERENCES "pokemon"("id_pokemon"),
    FOREIGN KEY ("id_move") REFERENCES "move"("id_move")
);

CREATE TABLE "users" (
    "id_user" SERIAL PRIMARY KEY,
    "username" VARCHAR(255) NOT NULL UNIQUE,
    "email" VARCHAR(255) NOT NULL UNIQUE,
    "password" TEXT NOT NULL
);

CREATE TABLE "favourite_pokemon" (
    "id_user" INT NOT NULL,
    "id_pokemon" INT NOT NULL,
    PRIMARY KEY("id_user", "id_pokemon"),
    FOREIGN KEY ("id_user") REFERENCES "users"("id_user"),
    FOREIGN KEY ("id_pokemon") REFERENCES "pokemon"("id_pokemon")
);

CREATE TABLE "catched_pokemon" (
    "id_user" INT NOT NULL,
    "id_pokemon" INT NOT NULL,
    PRIMARY KEY("id_user", "id_pokemon"),
    FOREIGN KEY ("id_user") REFERENCES "users"("id_user"),
    FOREIGN KEY ("id_pokemon") REFERENCES "pokemon"("id_pokemon")
);

CREATE TABLE "community_pokemon" (
    "id_community_pokemon" SERIAL PRIMARY KEY,
    "name" VARCHAR(255) NOT NULL,
    "description_es" TEXT NOT NULL,
    "description_en" TEXT NOT NULL,
    "specie_es" VARCHAR(255) NOT NULL,
    "specie_en" VARCHAR(255) NOT NULL,
    "height" DECIMAL(8, 2) NOT NULL,
    "weight" DECIMAL(8, 2) NOT NULL,
    "id_user" INT NOT NULL,
    "sprite" text not null,
    FOREIGN KEY ("id_user") REFERENCES "users"("id_user")
);

CREATE TABLE "teams" (
    "id_team" SERIAL PRIMARY KEY,
    "name" VARCHAR(255) NOT NULL,
    "created_time" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "user_id" INT NOT NULL,
    FOREIGN KEY ("user_id") REFERENCES "users"("id_user")
);

CREATE TABLE "items" (
    "id_item" SERIAL PRIMARY KEY,
    "name_en" VARCHAR(255) NOT NULL,
    "name_es" VARCHAR(255) NOT NULL,
    "description_en" TEXT NOT NULL,
    "description_es" TEXT NOT NULL,
    "holdable" BOOLEAN NOT NULL
);

CREATE TABLE "pokemon_teams" (
    "id_poketeam" SERIAL PRIMARY KEY,
    "id_pokemon" INT NOT NULL,
    "id_team" INT NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "ability" INT NOT NULL,
    "move1" INT NOT NULL,
    "move2" INT NOT NULL,
    "move3" INT NOT NULL,
    "move4" INT NOT NULL,
    "nature" VARCHAR(255) NOT NULL CHECK ("nature" IN (
        'Hardy', 'Lonely', 'Brave', 'Adamant', 'Naughty', 'Bold', 'Docile', 'Relaxed', 'Impish', 'Lax',
        'Timid', 'Hasty', 'Serious', 'Jolly', 'Naive', 'Modest', 'Mild', 'Quiet', 'Bashful', 'Rash',
        'Calm', 'Gentle', 'Careful', 'Sassy', 'Quirky'
    )),
    "attack_ev" SMALLINT NOT NULL,
    "special_attack_ev" SMALLINT NOT NULL,
    "defense_ev" SMALLINT NOT NULL,
    "special_defense_ev" SMALLINT NOT NULL,
    "speed_ev" SMALLINT NOT NULL,
    "hp_ev" SMALLINT NOT NULL,
    "id_item" INT NOT NULL,
    FOREIGN KEY ("id_pokemon") REFERENCES "pokemon"("id_pokemon"),
    FOREIGN KEY ("id_team") REFERENCES "teams"("id_team"),
    FOREIGN KEY ("id_item") REFERENCES "items"("id_item"),
    FOREIGN KEY ("move1") REFERENCES "move"("id_move"),
    FOREIGN KEY ("move2") REFERENCES "move"("id_move"),
    FOREIGN KEY ("move3") REFERENCES "move"("id_move"),
    FOREIGN KEY ("move4") REFERENCES "move"("id_move")
);


CREATE TABLE "basic_information" (
    "id_pokemon" INT NOT NULL,
    "generation" INT NOT NULL CHECK ("generation" BETWEEN 1 AND 9),
    "specie_es" VARCHAR(255) NOT NULL,
    "specie_en" VARCHAR(255) NOT NULL,
    "height" double PRECISION  NOT NULL,
    "weight" double PRECISION NOT NULL,
    "colour" varchar(12) NOT NULL,
    "evolution_state" INT NOT NULL CHECK ("evolution_state" BETWEEN 1 AND 3),
    "can_evolve" boolean not null,
    "pokedex_entry" text,
    PRIMARY KEY("id_pokemon"),
    FOREIGN KEY ("id_pokemon") REFERENCES "pokemon"("id_pokemon")
);

-- CREATE TABLE "sprites" (
--     "id_pokemon" INT NOT NULL,
--     "id_version" INT NOT NULL,
--     "front_sprite" TEXT NOT NULL,
--     "back_sprite" TEXT NOT NULL,
--     "front_sprite_shiny" TEXT,
--     "back_sprite_shiny" TEXT,
--     PRIMARY KEY("id_pokemon", "id_version"),
--     FOREIGN KEY ("id_pokemon") REFERENCES "pokemon"("id_pokemon"),
--     FOREIGN KEY ("id_version") REFERENCES "versions"("id_version")
-- );
