#include "Game.hpp"
#include "LL.hpp"
#include "NodeL.hpp"
#include "AVLY.hpp"
#include "NodeTY.hpp"

#include <string>
#include <iostream>
#include <fstream>
#include <stdlib.h>
#include <time.h>

using namespace std;

Game::Game() {
	score = 0;
}
Game::~Game() {
}

void Game::load_dict() {
	load_dict("dict.txt");
}
void Game::load_dict(string infile) {
	dict = new AVLY;
	ifstream file(infile.c_str()); //.c_str();
	string word;
	while (! file.eof()) {
		file >> word;
		NodeTY *foo = new NodeTY(word);
		dict->insert(foo);
	}
}

char * Game::generate_letters(int n) {
	int num_vowels = n/2;
	string vowels = "aeiouy"; //len = 6
	string consonants = "bcdfghjklmnpqrstvwxyz"; //len = 21

	char * ret = new char[n];
	for (int i = 0; i < num_vowels; i++) {
		ret[i] = vowels[rand() % 7 - 1];
	}
	for (int i = num_vowels; i < n; i++) {
		ret[i] = consonants[rand() % 22 - 1];
	}
	return ret;
}

bool Game::letters_are_verified(string s) {
	for (int i = 0; i < s.length(); i++) {
		for (int j = 0; j < num_letters; j++) {
			if (s[i] == curr_letters[j]) {
				break;
			}
			if (j == num_letters - 1) {
				return false;
			}
		}
	}
	return true;
}

void Game::get_user_words() {
	string curr_word;
	while (curr_word != "-1") {
		cin >> curr_word;
		NodeL *foo = new NodeL(curr_word);
		if (letters_are_verified(curr_word)) {
			word_list.push(foo);
		}
		else {
			if (curr_word == "-1") {
				break;
			}
			else {
				cout << "Oops! One or more of those letters aren't allowed." << endl;
			}
		}
	}
}

void Game::start_game() {
	//load_dict("practice_dict.txt");
	load_dict("dict.txt");

	cout << "Welcome to Yahtzee Scrabble!" << endl;
	cout << "You will be asked to enter a number. This will be the number of random letters you will get for the round. Using the random letters we give you, enter as many words as you can using ONLY THOSE LETTERS. When you are finnished, enter \"-1\" to receive your score." << endl;
	cout << "Do not enter any word more than once, and don't use any capital letters." << endl;
	cout << "The words will be checked using a scrabble dictionary, so the normal scrabble rules apply: no proper nouns, no abbreviations, and so on." << endl;
	cout << "Ready to play? Enter the number of letters you would like to play with: " << endl;
	cin >> num_letters;

	//generate random letters
	curr_letters = generate_letters(num_letters);

	cout << "Here are your letters: " << endl;
	for (int i = 0; i < num_letters; i++) {
		cout << curr_letters[i];
	}
	cout << endl;

	cout << "Start typing! Remember to hit enter after every word, and to type \"-1\" when you've found all the words you can." << endl;
	get_user_words();

	cout << endl << "Calculating score..." << endl;
	int ll_length = word_list.get_length();
	for (int i = 0; i < ll_length; i++) {
		NodeL *foo = word_list.pop();
		if (dict->search(foo->word)) {
			score += 2;
			//cout << i << "th one is good! Score = " << score << ", word = " << foo->word << endl;
		}
		else {
			score -= 4;
			//cout << i << "th one is bad! Score = " << score << ", word = " << foo->word <<  endl;
		}
	}
	cout << "Final score: " << score << endl;
	cout << "Play again? y/n" << endl;
	string play_again;
	cin >> play_again;
	if (play_again == "y") {
		start_game();
	}
}

void Game::test() {
	Game *game = new Game;
	//game->load_dict("practice_dict.txt");
	game->start_game(); //current default in start_game is "practice_dict.txt"

	cout << endl << "TESTING SEARCH" << endl;
	cout << "search for \"the\": " << game->dict->search("the") << endl;
	cout << "search for \"granges\": " << game->dict->search("granges") << endl;

}

int main() {
	srand(time(NULL));
	//Game::test();
	Game *game = new Game;
	game->start_game();
}
