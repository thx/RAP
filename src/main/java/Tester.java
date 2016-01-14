import com.taobao.rigel.rap.common.utils.MockjsRunner;
import redis.clients.jedis.Jedis;

/**
 * Created by Bosn on 2014/8/16.
 */
public class Tester {
    public static void main(String[] args) {
        String code= "1";
        String result = MockjsRunner.renderMockjsRule(code);
        System.out.println("result:" + result);
    }
}
