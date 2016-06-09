#ifndef HEAPARRAY_HPP_
#define HEAPARRAY_HPP_

class HeapArray {
	int size;
	int firstEmptyIndex;
	
	public:
		int *mainArray;
		void insert(int number);
		void del();
		void print();

		HeapArray(int size);
		~HeapArray();
};

#endif /* HEAPARRAY_HPP_ */
