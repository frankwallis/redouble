let require : Node.node_require Js.undefined = [%bs.node require];
class type _y = object
  method height : int [@@bs.set {no_get}]
end [@bs]
