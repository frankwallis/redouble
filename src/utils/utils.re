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

let rec take n xs => switch n {
| 0 => []
| _ =>
  switch xs {
  | [] => []
  | [hd, ...tl] => [hd, ...(take (n-1) tl)]
  }
};

let rec drop n xs => switch n {
| 0 => xs
| _ => switch xs {
  | [] => []
  | [_hd, ...tl] => drop (n-1) tl
  }
};

let rec range ::start=0 len =>
  (start >= len) ? [] : [start] @ (range start::(start+1) len);

let optionMap fmap opt => {
  switch opt {
  | Some value => Some (fmap value)
  | None => None
  }
};

let identity x => x;