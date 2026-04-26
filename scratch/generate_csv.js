const fs = require('fs');

const programs = [
  { p: 'BSCS', d: 'CS', count: 375 }, // Capacity is 400. 375 is 93% (High Priority Capacity Alert)
  { p: 'BSBio', d: 'Biology', count: 120 }, // Normal
  { p: 'BSPhysics', d: 'Physics', count: 100 }, // Normal
  { p: 'BSMath', d: 'Math', count: 5 } // Extremely low (Below Campus Average Alert)
];

let csv = "fullName,email,phone,program,department,session,matricPercent,fscPercent,gender,city\n";

let idCounter = 1000;
programs.forEach(({p, d, count}) => {
  for(let i=0; i<count; i++) {
    const matric = (Math.random() * (95 - 60) + 60).toFixed(1);
    const fsc = (Math.random() * (95 - 60) + 60).toFixed(1);
    const gender = Math.random() > 0.5 ? 'Male' : 'Female';
    const cities = ['Faisalabad', 'Lahore', 'Islamabad', 'Multan', 'Karachi', 'Rawalpindi'];
    const city = cities[Math.floor(Math.random() * cities.length)];
    
    csv += `Test Student ${idCounter},student${idCounter}@test.gcuf.edu.pk,0300${idCounter}0000,${p},${d},2024-2028,${matric},${fsc},${gender},${city}\n`;
    idCounter++;
  }
});

fs.writeFileSync('d:\\gcuf-fee-management\\scratch\\extreme_applicants.csv', csv);
console.log('Successfully generated extreme_applicants.csv with ' + (idCounter - 1000) + ' records.');
