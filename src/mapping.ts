import { Address, DataSourceContext, BigInt } from '@graphprotocol/graph-ts'
import { VotingProcessDeployed } from "../generated/VotingFactory/VotingFactory"
import { Voted } from "../generated/templates/VotingProcess/VotingProcess"
import { Answer, Token, TokenVotingProcess, User, Vote, VotingProcess } from "../generated/schema"
import { VotingProcess as VotingProcessTemplate } from "../generated/templates"

export function handleVotingProcessDeployed(event: VotingProcessDeployed): void {
  let entity = VotingProcess.load(event.params.votingProcessAddress.toHex());
  if (entity == null) {
    entity = new VotingProcess(event.params.votingProcessAddress.toHex());
  }
  
  entity.user = createUser(event.params.creator).id;
  entity.contract = event.params.votingProcessAddress;
  entity.question = event.params.question;
  entity.description = event.params.description;
  entity.uri = event.params.uri;
  entity.save();

  let context = new DataSourceContext();
  context.setBytes('contract', event.params.votingProcessAddress);
  VotingProcessTemplate.createWithContext(event.params.votingProcessAddress, context);

  let answers = event.params.answers;
  for(let i=0; i<answers.length; i++){
    createAnswer(entity.id, i, answers[i]);
  }
  
  let acceptedERC20 = event.params.acceptedERC20;
  for(let i=0; i<acceptedERC20.length; i++){
    let createdToken = createToken(entity.id, acceptedERC20[i]);
    createTokenVotingProcess(createdToken.id, entity.id);
  }
}

export function handleVoted(event: Voted): void {
  let entity = Vote.load(event.transaction.hash.toHex());
  if (entity == null) {
    entity = new Vote(event.transaction.hash.toHex());
  }

  entity.user = createUser(event.transaction.from).id;
  entity.votingProcess = event.transaction.to.toHex();
  
  entity.answer = Answer.load(event.transaction.to.toHex().toString() + '.' + event.params.answerId.toString()).id;
  entity.votingToken = Token.load(event.transaction.to.toHex() + '.' + event.params.votingToken.toHex()).id
  entity.votingAmount = event.params.votingAmount;
  entity.save(); 
}

export function createUser(address: Address): User {
  let user = User.load(address.toHexString());
  if (user === null) {
    user = new User(address.toHexString());
    user.address = address;
    user.save();
  }

  return user as User;
}

export function createAnswer(votingProcessId: string, index: i32, ans: string): Answer {
  let generatedId: string = votingProcessId.toString() + '.' + index.toString();

  let answer = Answer.load(generatedId);
  if (answer === null) {
    answer = new Answer(generatedId);
    answer.votingProcess = votingProcessId;
    answer.answer = ans;
    answer.save();
  }

  return answer as Answer;
}

export function createToken(votingProcessId: string, acceptedToken: Address): Token {
  let generatedId = votingProcessId.toString() + '.' + acceptedToken.toHex();
  let token = Token.load(generatedId);
  if (token === null) {
    token = new Token(generatedId);
    token.address = acceptedToken;
    token.save();
  }

  return token as Token;
}

export function createTokenVotingProcess(createdTokenId: string, votingProcessId: string): TokenVotingProcess {
  let generatedId = votingProcessId + createdTokenId;
  let tokenVotingProcess = TokenVotingProcess.load(generatedId);
  if (tokenVotingProcess === null) {
    tokenVotingProcess = new TokenVotingProcess(generatedId);
    tokenVotingProcess.votingProcess = votingProcessId;
    tokenVotingProcess.token = createdTokenId;
    tokenVotingProcess.save();
  }

  return tokenVotingProcess as TokenVotingProcess;
}