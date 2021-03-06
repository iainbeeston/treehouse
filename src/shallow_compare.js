let areEqual = (var1, var2) => {
  if ( var1 && var1.equals ) {
    return var1.equals(var2)
  } else {
    return var1 == var2
  }
}

export default (obj1, obj2) => {
  let key
  for ( key in obj1 ) {
    if ( !areEqual(obj1[key], obj2[key]) ) {
      return false
    }
  }
  return true
}
