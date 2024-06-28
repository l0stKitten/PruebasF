// step_definitions/frontend/clientSteps.js

import { Given, When, Then } from '@cucumber/cucumber';
import axios from 'axios';
import assert from 'assert';

let response;

Given('there are clientes in the database', async function () {
  // Assume the database is already populated with some clientes
});

When('I request the list of clientes', async function () {
  response = await axios.get('http://localhost:8000/api/clientes');
});

Then('I should receive a list of clientes', function () {
  assert.strictEqual(response.status, 200);
  assert.ok(response.data.clientes.length > 0);
});

Given('I have cliente data', function () {
  this.clienteData = {
    documento_identidad: '12345678',
    tipo_documento: '1',
    nombres: 'John',
    apellido_paterno: 'Doe',
    apellido_materno: 'Smith',
    distrito: 'Lima',
    provincia: 'Lima',
    direccion: '123 Main St',
    referencia: 'Near the park',
    comentario: 'Test cliente',
    num_telefono: ['987654321'],
  };
});

When('I send a request to create a new cliente', async function () {
  response = await axios.post('http://localhost:8000/api/cliente', this.clienteData);
});

Then('the cliente should be created successfully', function () {
  assert.strictEqual(response.status, 200);
  assert.strictEqual(response.data.nombres, 'JOHN');
});