#ifndef DOCUMENT_HPP_
#define DOCUMENT_HPP_

#include <string>

class Document {
	void build();

	public:
		std::string fileName;
		int wordCount;
		std::string *arr;

		void reset();

		Document(std::string);
		~Document();
};

#endif
