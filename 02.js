console.clear();

const toMatrix = function(str) {
	return str.split("\n").map(function(element){
		return element.split(/\s+/).map(function(el){
    		return parseInt(el);
    	});
	});
};

const input = toMatrix(String(
`798	1976	1866	1862	559	1797	1129	747	85	1108	104	2000	248	131	87	95
201	419	336	65	208	57	74	433	68	360	390	412	355	209	330	135
967	84	492	1425	1502	1324	1268	1113	1259	81	310	1360	773	69	68	290
169	264	107	298	38	149	56	126	276	45	305	403	89	179	394	172
3069	387	2914	2748	1294	1143	3099	152	2867	3082	113	145	2827	2545	134	469
3885	1098	2638	5806	4655	4787	186	4024	2286	5585	5590	215	5336	2738	218	266
661	789	393	159	172	355	820	891	196	831	345	784	65	971	396	234
4095	191	4333	161	3184	193	4830	4153	2070	3759	1207	3222	185	176	2914	4152
131	298	279	304	118	135	300	74	269	96	366	341	139	159	17	149
1155	5131	373	136	103	5168	3424	5126	122	5046	4315	126	236	4668	4595	4959
664	635	588	673	354	656	70	86	211	139	95	40	84	413	618	31
2163	127	957	2500	2370	2344	2224	1432	125	1984	2392	379	2292	98	456	154
271	4026	2960	6444	2896	228	819	676	6612	6987	265	2231	2565	6603	207	6236
91	683	1736	1998	1960	1727	84	1992	1072	1588	1768	74	58	1956	1627	893
3591	1843	3448	1775	3564	2632	1002	3065	77	3579	78	99	1668	98	2963	3553
2155	225	2856	3061	105	204	1269	171	2505	2852	977	1377	181	1856	2952	2262`));

/*
The spreadsheet consists of rows of apparently-random numbers. To make sure the recovery process is on the right track, they need you to calculate the spreadsheet's checksum. For each row, determine the difference between the largest value and the smallest value; the checksum is the sum of all of these differences.

For example, given the following spreadsheet:

5 1 9 5
7 5 3
2 4 6 8
The first row's largest and smallest values are 9 and 1, and their difference is 8.
The second row's largest and smallest values are 7 and 3, and their difference is 4.
The third row's difference is 6.
In this example, the spreadsheet's checksum would be 8 + 4 + 6 = 18.
*/

const spreadsheet = toMatrix(String(
`5 1 9 5
7 5 3
2 4 6 8`
));

const rowDiff = function(row) {
	let smallest = row[0], largest = row[0];
    for (let i = 0; i < row.length; i++) {
    	const val = row[i];
        smallest = val < smallest ? val : smallest;
        largest  = val > largest ? val : largest;
    }
    return largest - smallest;
};

const checkSum = function(sheet, rowFct) {
	let sum = 0;
    for (let i = 0; i < sheet.length; i++) {
    	sum += rowFct.call(null, sheet[i]);
    }
    return sum;
}


console.log(rowDiff(spreadsheet[0]));
console.log(rowDiff(spreadsheet[1]));
console.log(rowDiff(spreadsheet[2]));
console.log(checkSum(spreadsheet, rowDiff));
console.log(checkSum(input, rowDiff));


/*
--- Part Two ---

It sounds like the goal is to find the only two numbers in each row where one evenly divides the other - that is, where the result of the division operation is a whole number. They would like you to find those numbers on each line, divide them, and add up each line's result.

For example, given the following spreadsheet:

5 9 2 8
9 4 7 3
3 8 6 5
In the first row, the only two numbers that evenly divide are 8 and 2; the result of this division is 4.
In the second row, the two numbers are 9 and 3; the result is 3.
In the third row, the result is 2.
In this example, the sum of the results would be 4 + 3 + 2 = 9.

What is the sum of each row's result in your puzzle input?
*/

console.log("-------------");

const spreadsheet2 = toMatrix(String(
`5 9 2 8
9 4 7 3
3 8 6 5`
));

const getDivision = function(a, b) {
    if (a % b === 0) return a / b;
    if (b % a === 0) return b / a;
    return 0;
};


const getDivSumIteration = function(row, index) {
	for (let i=0; i<row.length; i++) {
        if (i===index) continue;
    	const div = getDivision(row[index], row[i]);
        if (div > 0) return div;
    }
    return 0;
};

// beware it is exponential growing :-/
const getDivSum = function(row) {
	for (let i=0; i<row.length;i++) {
    	const val = getDivSumIteration(row, i);
        if (val > 0) return val;
    }
    return 0;
}

console.log(getDivSum(spreadsheet2[0]));
console.log(getDivSum(spreadsheet2[1]));
console.log(getDivSum(spreadsheet2[2]));
console.log(checkSum(spreadsheet2, getDivSum));
console.log(checkSum(input, getDivSum));
