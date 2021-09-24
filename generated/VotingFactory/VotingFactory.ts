// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.

import {
  ethereum,
  JSONValue,
  TypedMap,
  Entity,
  Bytes,
  Address,
  BigInt
} from "@graphprotocol/graph-ts";

export class AdminChanged extends ethereum.Event {
  get params(): AdminChanged__Params {
    return new AdminChanged__Params(this);
  }
}

export class AdminChanged__Params {
  _event: AdminChanged;

  constructor(event: AdminChanged) {
    this._event = event;
  }

  get previousAdmin(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get newAdmin(): Address {
    return this._event.parameters[1].value.toAddress();
  }
}

export class BeaconUpgraded extends ethereum.Event {
  get params(): BeaconUpgraded__Params {
    return new BeaconUpgraded__Params(this);
  }
}

export class BeaconUpgraded__Params {
  _event: BeaconUpgraded;

  constructor(event: BeaconUpgraded) {
    this._event = event;
  }

  get beacon(): Address {
    return this._event.parameters[0].value.toAddress();
  }
}

export class Initialized extends ethereum.Event {
  get params(): Initialized__Params {
    return new Initialized__Params(this);
  }
}

export class Initialized__Params {
  _event: Initialized;

  constructor(event: Initialized) {
    this._event = event;
  }

  get owner(): Address {
    return this._event.parameters[0].value.toAddress();
  }
}

export class Upgraded extends ethereum.Event {
  get params(): Upgraded__Params {
    return new Upgraded__Params(this);
  }
}

export class Upgraded__Params {
  _event: Upgraded;

  constructor(event: Upgraded) {
    this._event = event;
  }

  get implementation(): Address {
    return this._event.parameters[0].value.toAddress();
  }
}

export class VotingProcessDeployed extends ethereum.Event {
  get params(): VotingProcessDeployed__Params {
    return new VotingProcessDeployed__Params(this);
  }
}

export class VotingProcessDeployed__Params {
  _event: VotingProcessDeployed;

  constructor(event: VotingProcessDeployed) {
    this._event = event;
  }

  get creator(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get votingProcessAddress(): Address {
    return this._event.parameters[1].value.toAddress();
  }

  get question(): string {
    return this._event.parameters[2].value.toString();
  }

  get description(): string {
    return this._event.parameters[3].value.toString();
  }

  get uri(): string {
    return this._event.parameters[4].value.toString();
  }

  get answers(): Array<string> {
    return this._event.parameters[5].value.toStringArray();
  }

  get acceptedERC20(): Array<Address> {
    return this._event.parameters[6].value.toAddressArray();
  }
}

export class VotingFactory extends ethereum.SmartContract {
  static bind(address: Address): VotingFactory {
    return new VotingFactory("VotingFactory", address);
  }

  createVotingProcess(
    question: string,
    description: string,
    uri: string,
    answers: Array<string>,
    acceptedERC20: Array<Address>
  ): Address {
    let result = super.call(
      "createVotingProcess",
      "createVotingProcess(string,string,string,string[],address[]):(address)",
      [
        ethereum.Value.fromString(question),
        ethereum.Value.fromString(description),
        ethereum.Value.fromString(uri),
        ethereum.Value.fromStringArray(answers),
        ethereum.Value.fromAddressArray(acceptedERC20)
      ]
    );

    return result[0].toAddress();
  }

  try_createVotingProcess(
    question: string,
    description: string,
    uri: string,
    answers: Array<string>,
    acceptedERC20: Array<Address>
  ): ethereum.CallResult<Address> {
    let result = super.tryCall(
      "createVotingProcess",
      "createVotingProcess(string,string,string,string[],address[]):(address)",
      [
        ethereum.Value.fromString(question),
        ethereum.Value.fromString(description),
        ethereum.Value.fromString(uri),
        ethereum.Value.fromStringArray(answers),
        ethereum.Value.fromAddressArray(acceptedERC20)
      ]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }
}

export class CreateVotingProcessCall extends ethereum.Call {
  get inputs(): CreateVotingProcessCall__Inputs {
    return new CreateVotingProcessCall__Inputs(this);
  }

  get outputs(): CreateVotingProcessCall__Outputs {
    return new CreateVotingProcessCall__Outputs(this);
  }
}

export class CreateVotingProcessCall__Inputs {
  _call: CreateVotingProcessCall;

  constructor(call: CreateVotingProcessCall) {
    this._call = call;
  }

  get question(): string {
    return this._call.inputValues[0].value.toString();
  }

  get description(): string {
    return this._call.inputValues[1].value.toString();
  }

  get uri(): string {
    return this._call.inputValues[2].value.toString();
  }

  get answers(): Array<string> {
    return this._call.inputValues[3].value.toStringArray();
  }

  get acceptedERC20(): Array<Address> {
    return this._call.inputValues[4].value.toAddressArray();
  }
}

export class CreateVotingProcessCall__Outputs {
  _call: CreateVotingProcessCall;

  constructor(call: CreateVotingProcessCall) {
    this._call = call;
  }

  get value0(): Address {
    return this._call.outputValues[0].value.toAddress();
  }
}

export class InitializeCall extends ethereum.Call {
  get inputs(): InitializeCall__Inputs {
    return new InitializeCall__Inputs(this);
  }

  get outputs(): InitializeCall__Outputs {
    return new InitializeCall__Outputs(this);
  }
}

export class InitializeCall__Inputs {
  _call: InitializeCall;

  constructor(call: InitializeCall) {
    this._call = call;
  }
}

export class InitializeCall__Outputs {
  _call: InitializeCall;

  constructor(call: InitializeCall) {
    this._call = call;
  }
}

export class UpgradeToCall extends ethereum.Call {
  get inputs(): UpgradeToCall__Inputs {
    return new UpgradeToCall__Inputs(this);
  }

  get outputs(): UpgradeToCall__Outputs {
    return new UpgradeToCall__Outputs(this);
  }
}

export class UpgradeToCall__Inputs {
  _call: UpgradeToCall;

  constructor(call: UpgradeToCall) {
    this._call = call;
  }

  get newImplementation(): Address {
    return this._call.inputValues[0].value.toAddress();
  }
}

export class UpgradeToCall__Outputs {
  _call: UpgradeToCall;

  constructor(call: UpgradeToCall) {
    this._call = call;
  }
}

export class UpgradeToAndCallCall extends ethereum.Call {
  get inputs(): UpgradeToAndCallCall__Inputs {
    return new UpgradeToAndCallCall__Inputs(this);
  }

  get outputs(): UpgradeToAndCallCall__Outputs {
    return new UpgradeToAndCallCall__Outputs(this);
  }
}

export class UpgradeToAndCallCall__Inputs {
  _call: UpgradeToAndCallCall;

  constructor(call: UpgradeToAndCallCall) {
    this._call = call;
  }

  get newImplementation(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get data(): Bytes {
    return this._call.inputValues[1].value.toBytes();
  }
}

export class UpgradeToAndCallCall__Outputs {
  _call: UpgradeToAndCallCall;

  constructor(call: UpgradeToAndCallCall) {
    this._call = call;
  }
}