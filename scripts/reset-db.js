const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function clearData() {
  const superAdminEmail = 'metachasm@gmail.com';
  console.log('--- Database Cleanup Started ---');
  
  try {
    // We clear organizations and memberships to reset the registration flow
    // NextAuth will recreate the Super Admin user record on their next login if deleted,
    // but we'll try to keep the user record if it exists to be safe.

    // 1. Delete all OrgMemberships
    console.log('Deleting all organization memberships...');
    await prisma.orgMembership.deleteMany({});

    // 2. Delete all Orgs
    console.log('Deleting all organizations...');
    await prisma.org.deleteMany({});

    // 3. Delete all Users except the Super Admin
    console.log(`Deleting all users except ${superAdminEmail}...`);
    await prisma.user.deleteMany({
      where: {
        email: { not: superAdminEmail }
      }
    });

    console.log('--- Cleanup Successful: System Reset ---');
    console.log('New users will now be forced to the registration page.');
  } catch (error) {
    console.error('FAILED to clear database:', error);
    console.log('\nTIP: This error usually means your DATABASE_URL is still incorrect.');
  } finally {
    await prisma.$disconnect();
  }
}

clearData();
