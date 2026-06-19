import fs from 'fs';
import path from 'path';

// Target CSV output path
const CSV_FILENAME = 'registration_sample.csv';
const outputPath = path.resolve(CSV_FILENAME);

// Headers matching required format
const headers = [
  'fullName',
  'email',
  'phone',
  'program',
  'department',
  'session',
  'matricPercent',
  'fscPercent',
  'gender',
  'city'
];

// Sample student datasets for generating valid records
const firstNames = [
  'Muhammad', 'Ayesha', 'Ahmad', 'Fatima', 'Ali', 'Zainab', 'Hamza', 'Sana',
  'Usman', 'Hafsa', 'Bilal', 'Mariam', 'Omar', 'Amina', 'Saad', 'Khadija',
  'Tayyab', 'Hira', 'Talha', 'Areeba', 'Muneeb', 'Anam', 'Taimoor', 'Laiba'
];

const lastNames = [
  'Khan', 'Ahmed', 'Ali', 'Raza', 'Malik', 'Tariq', 'Hassan', 'Siddiqui',
  'Iqbal', 'Qureshi', 'Shafiq', 'Bukhari', 'Dar', 'Gill', 'Javed', 'Rehman'
];

const programs = [
  { program: 'BSCS', department: 'CS' },
  { program: 'BSSE', department: 'CS' },
  { program: 'BSBIO', department: 'Biology' },
  { program: 'BSPHY', department: 'Physics' },
  { program: 'BSMATH', department: 'Math' },
  { program: 'BSCHEM', department: 'Chemistry' },
  { program: 'BBA', department: 'Management' }
];

const sessions = ['2024-2028', '2025-2029'];
const genders = ['Male', 'Female'];
const cities = ['Faisalabad', 'Lahore', 'Islamabad', 'Multan', 'Karachi', 'Rawalpindi', 'Peshawar'];

const generateSampleRows = (count) => {
  const rows = [];
  for (let i = 0; i < count; i++) {
    const fName = firstNames[Math.floor(Math.random() * firstNames.length)];
    const lName = lastNames[Math.floor(Math.random() * lastNames.length)];
    const fullName = `${fName} ${lName}`;
    const email = `${fName.toLowerCase()}.${lName.toLowerCase()}.${Math.floor(100 + Math.random() * 900)}@example.com`;
    const phone = `03${Math.floor(10 + Math.random() * 90)}${Math.floor(1000000 + Math.random() * 9000000)}`;
    const progChoice = programs[Math.floor(Math.random() * programs.length)];
    const session = sessions[Math.floor(Math.random() * sessions.length)];
    const matricPercent = (70 + Math.random() * 28).toFixed(1);
    const fscPercent = (65 + Math.random() * 33).toFixed(1);
    const gender = genders[Math.floor(Math.random() * genders.length)];
    const city = cities[Math.floor(Math.random() * cities.length)];

    rows.push({
      fullName,
      email,
      phone,
      program: progChoice.program,
      department: progChoice.department,
      session,
      matricPercent,
      fscPercent,
      gender,
      city
    });
  }
  return rows;
};

function main() {
  console.log('Generating registration CSV data...');
  const sampleData = generateSampleRows(50); // Generates 50 valid applicant rows
  
  // Format as CSV content
  const csvLines = [
    headers.join(','),
    ...sampleData.map(row => 
      headers.map(header => {
        const val = row[header];
        // Wrap string fields with quotes if they contain commas, otherwise standard write
        if (typeof val === 'string' && val.includes(',')) {
          return `"${val.replace(/"/g, '""')}"`;
        }
        return val;
      }).join(',')
    )
  ];

  const csvContent = csvLines.join('\n');
  fs.writeFileSync(outputPath, csvContent, 'utf-8');
  console.log(`\x1b[32m✓ Successfully generated CSV file at: ${outputPath}\x1b[0m`);
  console.log(`  Total rows: ${sampleData.length}`);
}

main();
