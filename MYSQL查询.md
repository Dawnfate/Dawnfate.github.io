





### 子查询练习

[SELECT within SELECT Tutorial/zh - SQLZOO](https://sqlzoo.net/wiki/SELECT_within_SELECT_Tutorial/zh)


1.列出每個國家的名字 **name**，當中人口 **population** 是高於俄羅斯'Russia'的人口。

```sql
SELECT name FROM world
  WHERE population >
     (SELECT population FROM world
      WHERE name='Russia')
```

2.列出歐州每國家的人均GDP，當中人均GDP要高於英國'United Kingdom'的數值。

```sql
select name from world
where continent  = 'Europe'and gdp/population > (
select gdp/population from world where name = 'United Kingdom' 
)
```

3.在阿根廷**Argentina** 及 澳大利亞 **Australia**所在的洲份中，列出當中的國家名字 **name** 及洲分 **continent** 。按國字名字順序排序

```sql
select name, continent from world where continent in (
select continent from world where name in ('Argentina', 'Australia')
) order by name asc
```

4.哪一個國家的人口比加拿大Canada的多，但比波蘭Poland的少?列出國家名字name和人口population 。

```sql
select name , population from world where population > (
select population from world where name = 'Canada'
)
and population < (
select population from world where name = 'Poland'
)
```

6.哪些國家的GDP比Europe歐洲的全部國家都要高呢? [只需列出 **name** 。] (有些國家的記錄中，GDP是NULL，沒有填入資料的。)

```sql
select name from world where  gdp > all(
select gdp from world  where  gdp > 0 and continent = 'europe'
)
```

7.在每一個州中找出最大面積的國家，列出洲份 **continent**, 國家名字 **name** 及面積 **area**。 (有些國家的記錄中，AREA是NULL，沒有填入資料的。)

```sql
SELECT continent, name, area FROM world x
where area >= ALL(
select area from world  y where x.continent = y.continent and area > 0
)
```

8.列出洲份名稱，和每個洲份中國家名字按子母順序是排首位的國家名。(即每洲只有列一國)

```sql
select continent,name from world x where name <= all(
select name from world y where x.continent = y.continent order by continent
) 
方法2：
select continent,min(name) from world x group by continent
```

9.找出洲份，當中全部國家都有少於或等於 25000000 人口. 在這些洲份中，列出國家名字**name**，**continent** 洲份和**population**人口。

```sql
select name,continent,population from world x where 25000000 >= (
select max(population) from world y where population > 0 and x.continent = y.continent
)
```


10.有些國家的人口是同洲份的所有其他國的3倍或以上。列出 國家名字name 和 洲份 continent。

```sql
select name, continent from world x where population >= all(
select 3*population from world y where x.continent = y.continent and population > 0 and x.name <> y.name
)
```

