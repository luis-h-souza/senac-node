import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT || 3000;

async function main() {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV}`);
}

main().catch(error => {
  console.error('Failed to start application:', error);
  process.exit(1);
});
