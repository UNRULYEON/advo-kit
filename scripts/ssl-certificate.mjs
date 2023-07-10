import { existsSync, mkdirSync, copyFileSync } from "fs";
import { execSync } from "child_process";
import { Command } from "commander";

const DEFAULT_CA_CERT_DIR = ".cert";
const CA_NAME = "advo-kit-ca";
const DEFAULT_CERT_DIR = `${DEFAULT_CA_CERT_DIR}/localhost`;
const CERT_NAME = "advo-kit-localhost";
const DEFAULT_PASSWORD = "advo-kit";

const program = new Command();

program
  .name("ssl-certificate")
  .description("Generate a self-signed SSL certificate for local development")
  .action(() => {
    // Generate CA certificate
    if (!existsSync(DEFAULT_CA_CERT_DIR)) mkdirSync(DEFAULT_CA_CERT_DIR);

    execSync(
      `openssl genrsa -out ${DEFAULT_CA_CERT_DIR}/${CA_NAME}.key -des3 -passout pass:${DEFAULT_PASSWORD} 2048`
    );
    execSync(
      `openssl req -new -config scripts/ssl-certificate-config -x509 -sha256 -nodes -key ${DEFAULT_CA_CERT_DIR}/${CA_NAME}.key -out ${DEFAULT_CA_CERT_DIR}/${CA_NAME}.pem -passin pass:${DEFAULT_PASSWORD}`
    );

    // Generate localhost certificate
    if (!existsSync(DEFAULT_CERT_DIR)) mkdirSync(DEFAULT_CERT_DIR);
    copyFileSync(
      "scripts/localhost.ext",
      `${DEFAULT_CERT_DIR}/${CERT_NAME}.ext`
    );

    execSync(
      `openssl genrsa -out ${DEFAULT_CERT_DIR}/${CERT_NAME}.key -des3 -passout pass:${DEFAULT_PASSWORD} 2048`
    );
    execSync(
      `openssl req -new -config scripts/ssl-certificate-config -key ${DEFAULT_CERT_DIR}/${CERT_NAME}.key -out ${DEFAULT_CERT_DIR}/${CERT_NAME}.csr -passin pass:${DEFAULT_PASSWORD}`
    );

    // Sign localhost certificate
    execSync(
      `openssl x509 -req -in ${DEFAULT_CERT_DIR}/${CERT_NAME}.csr -CA ${DEFAULT_CA_CERT_DIR}/${CA_NAME}.pem -CAkey ${DEFAULT_CA_CERT_DIR}/${CA_NAME}.key -CAcreateserial -days 3650 -sha256 -extfile ${DEFAULT_CERT_DIR}/${CERT_NAME}.ext -out ${DEFAULT_CERT_DIR}/${CERT_NAME}.crt -passin pass:${DEFAULT_PASSWORD}`
    );

    // Decrypt localhost certificate
    execSync(
      `openssl rsa -in ${DEFAULT_CERT_DIR}/${CERT_NAME}.key -out ${DEFAULT_CERT_DIR}/${CERT_NAME}.decrypted.key -passin pass:${DEFAULT_PASSWORD}`
    );
  });

program.parse();
