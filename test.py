import time
import types


@types.coroutine
def switch():
    yield


async def foo1():
    print('Enter foo1(), going to sleep...')
    await switch()
    time.sleep(3)
    print('3s later...')
    print('weak up from sleeping, and leaving foo1()...')


async def foo2():
    print('Enter foo2()...')
    print('leaving foo2()...')


f1 = foo1()
f2 = foo2()


def run(coros):
    coros = list(coros)
    while coros:
        for coro in coros:
            try:
                coro.send(None)
            except StopIteration:
                coros.remove(coro)


run([f1, f2])
