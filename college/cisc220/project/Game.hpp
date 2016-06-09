#ifndef GAME_HPP_
#define GAME_HPP_

#include "AVLY.hpp"
#include "LL.hpp"
#include <string>

class Game {
	AVLY *dict;
	int num_letters;
	char *curr_letters; //the random set of letters
	int score;
	LL word_list;

	public:
		Game();
		~Game();

		void start_game();
		void load_dict();
		void load_dict(std::string infile);
		void get_user_words();
		char * generate_letters(int n); //gets random letters
		bool letters_are_verified(std::string s); //checks that letters are part of curr_letters

		static void test();
	
};


#endif /* GAME_HPP_ */
