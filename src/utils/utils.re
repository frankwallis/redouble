let rec split_on_char delim str => {
  switch (String.index str delim) {
  | exception Not_found => [str]
  | idx => [(String.sub str 0 idx)] @ (split_on_char delim (String.sub str (idx+1) ((String.length str) - (idx+1))))
  }
};

let rec to_list str => switch str {
| "" => []
| _ => [(String.sub str 0 1), ...(to_list (String.sub str 1 ((String.length str) -1)))]
};