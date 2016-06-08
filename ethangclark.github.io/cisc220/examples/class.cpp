#include <iostream>

using namespace std;

class Rect {
	int length, width, area;

	public:
		Rect(int l, int w) {
			length = l;
			width = w;
			area = length * width;
		}

		void setLen(int x) {
			length = x;
			area = length * width;
		}

		int getLen();

		int getArea() {
			return area;
		}
};

int Rect::getLen() {
	return length;
}

int main() {
	Rect r(3,4);
	r.setLen(2);
	cout << r.getArea() << endl;
	return 0;
}
