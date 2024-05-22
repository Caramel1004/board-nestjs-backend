import { Test, TestingModule } from '@nestjs/testing';
import { BoardsController } from './boards.controller';
import { BoardsService } from '../services/boards.service';
import { Board, BoardStatus } from "../boards.model";
import { UUID, randomUUID } from 'crypto';
import { BoardDto } from '../dto/board.dto';


jest.mock('../services/boards.service')

let boardsService: BoardsService = new BoardsService();
let boardsController: BoardsController = new BoardsController(boardsService);

describe('BoardsController', () => {

    beforeEach(async () => {
        const app: TestingModule = await Test.createTestingModule({
            controllers: [BoardsController],
            providers: [BoardsService]
        }).compile();
        boardsController = app.get<BoardsController>(BoardsController);
        boardsService = app.get<BoardsService>(BoardsService);
    });

    describe('컨트롤러 모듈이 주입 되었는지 확인', () => {
        it('컨트롤러', () => {
            expect(boardsController).toBeDefined();
            expect(boardsService).toBeDefined();
        })
    });

    describe('EndPoint: /boards/create', () => {

        it('게시물 저장', async () => {
            /* given: 응답 바디 Test Case */
            const responseBodyMock = {
                id: randomUUID(),
                title: 'test',
                description: 'test',
                status: BoardStatus.PUBLIC
            }

            /* given: 응답 바디 Test Case가 Return 되도록 가정 */
            const createPostSpyFn =
                jest.spyOn(boardsService, 'createPost').mockImplementation(() => responseBodyMock);

            /* when: 게시물 저장 함수 호출 */
            const post: Board = boardsController.createPost({
                title: 'test',
                description: 'test',
                status: BoardStatus.PUBLIC
            });

            console.log(post);

            /* then: mocking한 함수 호출되었는지 확인 */
            expect(createPostSpyFn).toHaveBeenCalledWith({
                title: 'test',
                description: 'test',
                status: BoardStatus.PUBLIC
            });
            expect(createPostSpyFn).toHaveBeenCalledTimes(1);
            expect(createPostSpyFn).toHaveLastReturnedWith(responseBodyMock)

            expect(post.id).toEqual(responseBodyMock.id);
            expect(post.title).toEqual('test');
            expect(post.description).toEqual('test');
            expect(post.status).toEqual(BoardStatus.PUBLIC);
        })
    })

    describe('EndPoint: /boards', () => {

        it('모든 게시물 조회', async () => {
            /* given: 배열 형태로 Return 되도록 가정 */
            const getAllBoardsSpyFn =
                jest.spyOn(boardsService, 'getAllBoards').mockImplementation(() => []);

            /* when: 모든 게시물 조회하는 함수 호출 */
            const posts: Board[] = boardsController.getAllBoard();

            console.log(posts);

            /* then: 모킹한 함수 호출 확인 */
            expect(getAllBoardsSpyFn).toHaveBeenCalledTimes(1);
            expect(getAllBoardsSpyFn).toHaveLastReturnedWith([]);

            expect(posts).toEqual([]);
        })
    })

    describe('EndPoint: /boards/:id', () => {

        it('특정 게시물 조회', async () => {
            /* given: 특정 식별 아이디 Test Case 생성*/
            const idtestCase: UUID = randomUUID();

            /* given: 특정 식별 아이디로 조회한 게시물 Test Case */
            const responseBodyMock = {
                id: idtestCase,
                title: 'test',
                description: 'test',
                status: BoardStatus.PUBLIC
            }

            /* given: 응답 바디 Test Case가 Return 되도록 가정 */
            const getPostByIdSpyFn =
                jest.spyOn(boardsService, 'getPostById').mockImplementation(() => responseBodyMock);

            /* when: 특정 게시물 조회 함수 호출 */
            const post: Board = boardsController.getPostById(idtestCase);

            console.log(post);

            /* then: mocking한 함수 호출되었는지 확인 */
            expect(getPostByIdSpyFn).toHaveBeenCalledWith(idtestCase);
            expect(getPostByIdSpyFn).toHaveBeenCalledTimes(1);
            expect(getPostByIdSpyFn).toHaveLastReturnedWith(responseBodyMock);

            /* then: 조회한 게시물이 responseBodyMock과 일치하는지 확인  */
            expect(post.id).toEqual(idtestCase);
            expect(post.description).toEqual('test');
            expect(post.title).toEqual('test');
            expect(post.status).toEqual('PUBLIC');
        })
    });

    describe('EndPoint: /boards/update/:id', () => {
        it('특정 게시물 수정', () => {
            /* given: 특정 게시물 아이디 Test Case */
            const idTestCase: UUID = randomUUID();

            /* given: 응답 바디 Test Case */
            const responseBodyMock = {
                code: 200,
                msg: `${idTestCase} 게시물이 수정 되었습니다.`
            }

            /* given: 요청 바디 Test Case */
            const requestBodyMock: BoardDto = {
                title: 'jest testing',
                description: 'Test Case',
                status: 'public'.toUpperCase()
            }

            /* given: 응답 바디 Test Case가 Return 되도록 가정 */
            const updatePostByIdSpyFn =
                jest.spyOn(boardsService, 'updatePostById').mockImplementation(() => responseBodyMock);

            /* when: 특정 게시물 수정 함수 호출 */
            const response = boardsController.updatePostById(idTestCase, requestBodyMock);

            /* then: mocking한 함수 호출되었는지 확인 */
            expect(updatePostByIdSpyFn).toHaveBeenCalledWith(idTestCase, requestBodyMock);
            expect(updatePostByIdSpyFn).toHaveBeenCalledTimes(1);
            expect(updatePostByIdSpyFn).toHaveLastReturnedWith(responseBodyMock);

            /* then: 선택한 게시물이 수정되었는지 메세지 확인 */
            expect(response.code).toEqual(200);
            expect(response.msg).toEqual(`${idTestCase} 게시물이 수정 되었습니다.`);
        })
    });

    describe('EndPoint: /boards/delete/:id', () => {
        it('특정 게시물 삭제', () => {
            /* given: 특정 게시물 아이디 Test Case */
            const idTestCase: UUID = randomUUID();

            /* given: 응답 바디 Test Case */
            const responseBodyMock = {
                code: 200,
                msg: `${idTestCase} 게시물이 삭제 되었습니다.`
            }

            /* given: 응답 바디 Test Case가 Return 되도록 가정 */
            const deletePostByIdSpyFn =
                jest.spyOn(boardsService, 'deletePostById').mockImplementation(() => responseBodyMock);

            /* when: 특정 게시물 삭제 함수 호출 */
            const response = boardsController.deletePostById(idTestCase);

            /* then: mocking한 함수 호출되었는지 확인 */
            expect(deletePostByIdSpyFn).toHaveBeenCalledWith(idTestCase);
            expect(deletePostByIdSpyFn).toHaveBeenCalledTimes(1);
            expect(deletePostByIdSpyFn).toHaveLastReturnedWith(responseBodyMock);

            /* then: 선택한 게시물이 수정되었는지 메세지 확인 */
            expect(response.code).toEqual(200);
            expect(response.msg).toEqual(`${idTestCase} 게시물이 삭제 되었습니다.`);
        });
    })
});
