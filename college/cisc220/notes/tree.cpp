
using namespace std;

//binary trees:
//full tree: 0-2 children per node
//complete tree: of height h, is filled to depth h-1
//    ....and at height h unfilled nodes are on the right
//				(this part isn't as well-established?)

/*traversing a binary tree:
	3 ways to traverse:
		preorder
			1) visit root
			2) go to left
			3) go to right
			--like circling the outside of the graphical rep from the left
		inorder
			1) left child
			2) parent
			3) right child
			--remember non-existent children
			----it's like sweeping ltr on correct spatial tree
		postorder
			1) left
			2) right
			3) root
			--like sweeping bottom to top on correct spatial tree

EX:
	preord: (prefix)
		star plus x y slash plus a b c
	inord: (infix)
		x plus y star a plus b slash c
	postord: (postfix)
		x y plus a b plus c slash star
