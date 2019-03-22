module.exports = function getZerosCount(number, base) {
  var result = 0;
  var baseM = base;
  //разложение числа на множители
  var j = 1;
  var i = 2;
  var multipliers = [];
  do {
    if (baseM % i == 0) {
      multipliers[j] = i;
      j++;
      baseM = baseM / i;
    } else {
      i++;
    }
  }
  while (i < baseM);
  multipliers[j] = i;

  //кидаем в мапу количество каждого можителя
  var res = {};
  multipliers.forEach(function(e) {
    res[e] = 1 + ~~res[e];
  })

  //модифицируем multiplies и добавляем количество множителей
  multipliers = Object.keys(res);
  for (var i = 0; i < multipliers.length; i++) {
    multipliers[i] = parseInt(multipliers[i]);
  }
  var multipliersNumbers = Object.values(res);

  //делим number на каждый множитель из мапы
  var numberRes = 0;
  var sumFor = [];
  var k = 0;
  var l = 0;

  for (var i = 0; i < multipliers.length; i++) {
    k = multipliers[i];
    var numberForRes = [];
    var sum = 0;
    l = 2;
    while (l > 1) {
      l = Math.floor(number / k);
      numberForRes.push(l);
      if (l > 1) {
        k = k * multipliers[i];
      }
    }
    //собираем суммы вычислений в список
    for (var j = 0; j < numberForRes.length; j++) {
      sum = sum + parseInt(numberForRes[j]);
    }
    sum = Math.floor(sum / multipliersNumbers[i]);
    sumFor.push(sum);
  }

  //выбираем наименьшее значение из списка
  function sIncrease(i, ii) {
    if (i > ii)
      return 1;
    else if (i < ii)
      return -1;
    else
      return 0;
  }
  sumFor.sort(sIncrease);
  result = sumFor[0];
  // частный случай двоичной системы счисления
  if (base===2) {
    result=result*2;
    return result;
  }
  return result;
  // your implementation
}
