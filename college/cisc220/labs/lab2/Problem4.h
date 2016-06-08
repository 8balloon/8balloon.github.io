//Ethan Clark
//CISC220-022L
//Lab 2, problem 4

void Problem4(char* character_array, char character_1, char character_2, int array_length) {
//takes character array, character to replace, character to replace with, and array length
//...and does the replacement on the array.

	//main loop
	for (int i = 0; i < array_length; i++) {
		if (character_array[i] == character_1) {
			character_array[i] = character_2;
		}
	}

}

char* Problem5(char* character_array, char skip_character, int* array_length) {
	//NOTE TO SELF: have to create the new array on the stack

	//we've got to see how many characters the new array will be.
	int new_array_length = 0;
	//counting the number of non-skip_character characters for the new array length
	for (int i = 0; i < *array_length; i++) {
		if (character_array[i] != skip_character) new_array_length++;
	}
	
	char* return_array = new char[new_array_length];

	int new_arr_idx = 0;
	for (int i = 0; i < *array_length; i++) {
		if (character_array[i] != skip_character) {
			return_array[new_arr_idx] = character_array[i];
			new_arr_idx++;
		}
	}

	*array_length = new_array_length;

	return return_array;
}
