#include <vector>
#include <string>
#include <iostream>

using namespace std;


vector<string> merge_sort(vector<string>& vec);
vector<string> merge(vector<string> &vec,const vector<string>& left, const vector<string>& right);

//! \brief Performs a recursive merge sort on the given vector
//! \param vec The vector to be sorted using the merge sort
//! \return The sorted resultant vector after merge sort is
//! complete.
vector<string> merge_sort(vector<string>& vec)
{
   // Termination condition: List is completely sorted if it
   // only contains a single element.
   if(vec.size() == 1)
   {
       return vec;
   }

   // Determine the location of the middle element in the vector
   std::vector<string>::iterator middle = vec.begin() + (vec.size() / 2);

   vector<string> left(vec.begin(), middle);
   vector<string> right(middle, vec.end());

   // Perform a merge sort on the two smaller vectors
   left = merge_sort(left);
   right = merge_sort(right);

   return merge(vec,left, right);
}



//! \brief Merges two sorted vectors into one sorted vector
//! \param left A sorted vector of integers
//! \param right A sorted vector of integers
//! \return A sorted vector that is the result of merging two sorted
//! vectors.
vector<string> merge(vector<string> &vec,const vector<string>& left, const vector<string>& right)
{
// Fill the resultant vector with sorted results from both vectors
vector<string> result;
unsigned left_it = 0, right_it = 0;

while(left_it < left.size() && right_it < right.size())
{
       // If the left value is smaller than the right it goes next
       // into the resultant vector
       if(left[left_it] < right[right_it])
       {
           result.push_back(left[left_it]);
           left_it++;
       }
       else
       {
           result.push_back(right[right_it]);
           right_it++;
       }
   }

   // Push the remaining data from both vectors onto the resultant
   while(left_it < left.size())
   {
       result.push_back(left[left_it]);
       left_it++;
   }

   while(right_it < right.size())
   {
       result.push_back(right[right_it]);
       right_it++;
   }
   //show merge process..
     int i;
     for(i=0;i<result.size();i++)
        {                                
             cout<<result[i]<<" ";
        }
   // break each line for display purposes..
       cout<<"***********"<<endl; 

   //take a source vector and parse the result to it. then return it.  
        vec = result;                                
        return vec;
}
/*
int main() {

	return 0;
}
*/
