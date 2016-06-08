#ifndef NODE_HPP_
#define NODE_HPP_

struct Node {
    int* pointerToInt;
    double dub;
    Node *next;
    Node *prev;

    Node();
    Node(int i);
    Node(int i, double d);
};

#endif /* NODE_HPP_ */
