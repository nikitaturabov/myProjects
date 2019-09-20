export default function(items, value) {
  let result = false;
  
  const iter = (items, value) => {
    items.forEach(item => {
      if (item.type === value) {
        result = true;
        return;
      }

      if (item.childs && item.childs.length > 0) {
        iter(item.childs, value);
      }
    })
  }
  
  iter(items, value);
  
  return result;
}
