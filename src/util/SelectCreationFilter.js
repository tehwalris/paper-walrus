//HACK patch allowCreate in 1.0.0-beta
//https://gist.github.com/Craga89/5215e0e5079741b856d8
export default function(getNewOption) {
  // getNewOption(inputText) -> option
  return function(options, filter, currentValues) {
    let filteredOptions = options.reduce((memo, option) => {
      if (!('label' in option)) {
        memo.push(option);
      } else if (filter && filter.length >= 1) {
        let valueNormalized = option.label.toLowerCase().trim();
        let filterNormalized = filter.toLowerCase().trim();
        if (valueNormalized.indexOf(filterNormalized) > -1) {
          memo.push(option);
        }
      } else {
        memo.push(option);
      }
      return memo;
    },
    []);
    if (filteredOptions.length < 1 && filter) {
      const newOption = getNewOption(filter);
      if (newOption)
        filteredOptions.push(newOption);
    }
    return filteredOptions;
  };
}
