'use server'

import { Todo } from '@/types/todos'
import { PromptTemplate } from '@langchain/core/prompts'
import { ChatMistralAI } from '@langchain/mistralai'
import { prismaWrite } from '@/utils/prisma'

const promptTemplate = PromptTemplate.fromTemplate(
    'Generate a short funny todo comment that is ripping the user in a funny way. The comment should be max 25chars long. The todo is: {todo}'
)

const model = new ChatMistralAI()

export async function generateTodoComment(todo: Todo) {
    const chain = promptTemplate.pipe(model)
    const result = await chain.invoke({ todo: todo.title })
    await prismaWrite.todo.update({
        where: {
            uuid: todo.uuid,
        },
        data: {
            ai_comment: result.content as string,
        },
    })
    return result.content as string
}
