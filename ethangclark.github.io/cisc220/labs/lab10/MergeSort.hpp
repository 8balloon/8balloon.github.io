#ifndef MERGESORT_HPP_
#define MERGESORT_HPP_

#include <string>

std::vector<std::string> merge_sort(std::vector<std::string>& vec);
std::vector<std::string> merge(std::vector<std::string>& vec, const std::vector<std::string>& left, const std::vector<std::string>& right);

#endif
