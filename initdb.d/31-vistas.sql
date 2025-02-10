\connect pokemon;
create view pokeplay_pokemondle as 
    select pokemon.id_pokemon, name, generation, specie_es, specie_en, height, weight, colour, evolution_state, can_evolve
            from pokemon inner join basic_information using (id_pokemon);

create view pokeplay_guess as 
        select id_pokemon, name from pokemon;

create view pokeplay_entry as
        select id_pokemon, name, pokedex_entry
                from pokemon inner join basic_information
                using (id_pokemon);

create view pokedex_general as
        select id_pokemon, name, type1, type2 from pokemon;

create view pokedex_pokemon as
        select type1,type2,name,base_attack,base_defense,base_special_attack,base_special_defense,base_speed, base_hp, basic_information.* 
            from pokemon inner join basic_information using(id_pokemon);

create view pokedex_move as 
        select id_pokemon, move.*
            from move inner join move_pokemon using (id_move);




