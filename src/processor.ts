import {assertNotNull} from '@subsquid/util-internal'
import {lookupArchive} from '@subsquid/archive-registry'
import {
    BlockHeader,
    DataHandlerContext,
    EvmBatchProcessor,
    EvmBatchProcessorFields,
    Log as _Log,
    Transaction as _Transaction,
} from '@subsquid/evm-processor'
import * as erc20Abi from './abi/erc20'
//import {allTraceFields} from './allFields'

const allTraceFields = {
  createFrom: true,
  createValue: true,
  createGas: true,
  createInit: true,
  createResultGasUsed: true,
//  createResultCode: true,
//  createResultAddress: true,
  callFrom: true,
  callTo: true,
  callValue: true,
  callGas: true,
  callSighash: true,
  callInput: true,
  callResultGasUsed: true,
//  callResultOutput: true,
  suicideAddress: true,
  suicideRefundAddress: true,
  suicideBalance: true,
  rewardAuthor: true,
  rewardValue: true,
  rewardType: true
}

export const processor = new EvmBatchProcessor()
  .setGateway(lookupArchive("avalanche"))
  .setRpcEndpoint(
    process.env.RPC_HTTP ?? "https://api.avax.network/ext/bc/C/rpc"
  )
//  .setBlockRange({})
  .setFinalityConfirmation(75)
  .addTransaction({ traces: true })
  .addLog({
    topic0: [erc20Abi.events.Transfer.topic],
  })
  .setFields({ trace: allTraceFields })

export type Fields = EvmBatchProcessorFields<typeof processor>
export type Block = BlockHeader<Fields>
export type Log = _Log<Fields>
export type Transaction = _Transaction<Fields>
export type ProcessorContext<Store> = DataHandlerContext<Store, Fields>
