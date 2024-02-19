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

const allTraceFields = {
  createFrom: true,
  createValue: true,
  createGas: true,
  createInit: true,
  createResultGasUsed: true,
//  createResultCode: true, // <--- faulty
//  createResultAddress: true, // <--- faulty
  callFrom: true,
  callTo: true,
  callValue: true,
  callGas: true,
  callSighash: true,
  callInput: true,
  callResultGasUsed: true,
//  callResultOutput: true, // <--- faulty
  suicideAddress: true,
  suicideRefundAddress: true,
  suicideBalance: true,
  rewardAuthor: true,
  rewardValue: true,
  rewardType: true
}

export const processor = new EvmBatchProcessor()
  .setGateway(lookupArchive("avalanche"))
  .addTransaction({ traces: true })
  .setFields({ trace: allTraceFields })
