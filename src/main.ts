import {TypeormDatabase} from '@subsquid/typeorm-store'
// import {Burn} from './model'
import {processor} from './processor'

processor.run(new TypeormDatabase({supportHotBlocks: true}), async (ctx) => {
	ctx.log.info(`Got a batch of ${ctx.blocks.length} blocks`)
})
