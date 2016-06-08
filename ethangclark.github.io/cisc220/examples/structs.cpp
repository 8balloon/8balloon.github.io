#include <iostream>

using namespace std;

//REMEMBER: structs are call by value!!!
//(can't pass to function and have it change original)

struct StudentInfo {
	string fname;
	string lname;
	int id;
};   ///need a semicolon

//NOTE: you can't have StructA be a component of StructA
//BUT you can have a POITER TO TYPE STRUCTA be a component of SructA

void changeStud(StudentInfo *x) {
	x->fname = "Sammy";  //this is called "Pointer dot"
	//...it's "equivalent" to *x.
}

int main() {
	StudentInfo Sam;
	Sam.fname = "Sam";
	Sam.lname = "Stone";
	Sam.id = 3241;
	
	StudentInfo studarr[5];
	studarr[1].fname = "Taylor";

	cout << studarr[1].fname << endl;

	cout << Sam.fname << endl;
	changeStud(&Sam);
	cout << Sam.fname << endl;
	return 0;
}
