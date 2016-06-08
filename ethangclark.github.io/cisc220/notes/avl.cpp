/*
 * AVL -- balanced binary search tree
 *
 * Difference between left and right subtree of any node is <= 1
 * (AKA it's complete [not full])
 *
 */

/*"Rotate towards the lesser side during imba
 */

/*B+ trees(!)
 * ...accessing sheyit that lives in your storage (hd) AKA doesn't fit in memory
 *
 * "now that I've said that, you don't have to worry about the hd stuff now."
 *
 * virtual memory === hd working as memory becuase you don't have enough memory
 * ...so it's the same sort of access writing as in memory
 *
 * B+ used for DBMS
 * --leaf nodes on disk
 *
 *  DEFINITION:
 *      B+ Tree:
 *          M-ary tree:
 *              Leaf nodes contain no data
 *              ONly tell us how to get to data
 *              All content in leaf nodes
 *	--When you "bring leaves up into memory" you bring up a clump of them
 *	--Leaf nodes are a sorted linked list
 *
